---
title: "Rails translation cheatsheet"
author: "Lars Peters"
pubDatetime: 2025-05-08T00:00:00Z
description: "A practical guide to translating a Rails application: locale configuration, locale files, URL routing, helpers, model translations, and the Traco gem for translatable columns."
tags: ["Ruby on Rails"]
---

How to translate a Rails application.

## Locales

```ruby
# config/application.rb

config.i18n.available_locales = %i[de fr it]
config.i18n.default_locale = :de
config.i18n.fallbacks = true
```

Add [rails-i18n](https://github.com/svenfuchs/rails-i18n) for ready-made date, number, and Active Record translations:

```ruby
# Gemfile
gem "rails-i18n"
```

## Locale files

```yaml
# config/locales/de.yml
de:
  hello: "Hallo, %{name}!"
  apples:
    one: "1 Apfel"
    other: "%{count} Äpfel"
  pages:
    thankyou:
      title: "Danke"
      body_html: "<strong>Vielen Dank</strong> für deine Anfrage."
```

Use lazy lookup in views and controllers to avoid repeating the full key path:

```erb
# app/views/pages/thankyou.html.erb
<h1><%= t(".title") %></h1>
<%= t(".body_html") %>
```

A key ending in `_html` (or a leaf named `html`) is marked safe and rendered without escaping.

## URL routing

```ruby
# app/controllers/application_controller.rb

class ApplicationController < ActionController::Base
  around_action :switch_locale

  def switch_locale(&)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &)
  end

  def default_url_options
    { locale: I18n.locale }
  end
end
```

```ruby
# config/routes.rb

scope "(:locale)", locale: /de|fr|it/ do
  get "thankyou", to: "pages#thankyou"
  get "terms", to: "pages#terms"

  resource :submissions, only: %i[new create]
  get "submissions", to: "submissions#new"
  get "/", to: "submissions#new"
end
```

Set `lang` on the layout so screen readers and search engines pick up the active locale:

```erb
# app/views/layouts/application.html.erb
<html lang="<%= I18n.locale %>">
```

A minimal locale switcher:

```erb
<% I18n.available_locales.each do |l| %>
  <%= link_to l.to_s.upcase, url_for(locale: l),
      class: ("active" if I18n.locale == l) %>
<% end %>
```

## Dates and numbers

```erb
<%= l(Time.current, format: :short) %>
<%= number_to_currency(19.99) %>
```

`rails-i18n` ships the formats. Override them per locale under `date.formats`, `time.formats`, and `number.*`.

## Models and validations

```yaml
# config/locales/de.yml
de:
  activerecord:
    models:
      question:
        one: "Frage"
        other: "Fragen"
    attributes:
      question:
        question: "Frage"
        answer: "Antwort"
    errors:
      models:
        question:
          attributes:
            answer:
              blank: "muss ausgefüllt werden"
```

`Question.model_name.human` and `Question.human_attribute_name(:answer)` resolve these automatically, so form labels and validation messages stay translated without extra wiring.

## Field translation

[Translatable columns for Ruby on Rails, stored in the model table itself](https://github.com/barsoom/traco)

```ruby
# Gemfile
gem "traco"
```

```ruby
# app/models/question.rb

class Question < ApplicationRecord
  translates :question, :answer
end
```

Traco expects per-locale columns like `question_de`, `question_fr`, `question_it`. For a heavier setup with a separate translations table, look at [Mobility](https://github.com/shioyama/mobility).

## Finding missing keys

[i18n-tasks](https://github.com/glebm/i18n-tasks) scans the codebase for untranslated keys and unused entries:

```bash
bundle exec i18n-tasks missing
bundle exec i18n-tasks unused
```

---
title: "Ruby on Rails resources"
author: "Lars Peters"
pubDatetime: 2026-01-21T00:00:00Z
description: "A comprehensive link directory and continually updated notes for Ruby on Rails development, covering admin interfaces, APIs, authentication, caching, databases, testing, and more."
ogImage: "/images/posts/ruby-on-rails-resources/alexander-sinn-KgLtFCgfC28-unsplash.jpg"
tags: ["Ruby on Rails", "Resources"]
---

Link directory and notes for Ruby on Rails. Continually updated.

My link directory and notes for Ruby on Rails. As usual, a work in progress and continually updated.

### Admin interfaces

- [Madmin](https://github.com/excid3/madmin?ref=larsp.de)
- [Avo](https://avohq.io/?ref=larsp.de)

### AI

- [Raif (Ruby AI Framework)](https://github.com/CultivateLabs/raif?ref=larsp.de) is a Rails engine that helps you add AI-powered features to your Rails apps

### APIs

- [Apipie](https://github.com/Apipie/apipie-rails?ref=larsp.de)
- [A framework for DRY RESTful APIs in Ruby on Rails](https://github.com/gregschmit/rails-rest-framework?ref=larsp.de)
- [Building your own API with Rails - Learn Interactively](https://www.educative.io/courses/building-api-rails?ref=larsp.de)
- [Building High Performance Ruby REST APIs with Rage](https://zuplo.com/blog/2025/04/13/ruby-rage-rest-api-tutorial?ref=larsp.de)

### Apple Wallet

- [Apple Wallet Passes in Rails Apps](https://avohq.io/blog/apple-wallet-passes-in-rails-apps?ref=larsp.de)

### Authorization

- [Rails API Authentication with the auth generator](https://avohq.io/blog/rails-api-authentication-with-the-auth-generator?ref=larsp.de)
- [Sign in with Apple for Rails apps](https://avohq.io/blog/sign-in-with-apple-rails?ref=larsp.de)
- [Passwordless authentication with the NoPassword gem](https://avohq.io/blog/passwordless-authentication-rails-no-password?ref=larsp.de)
- [An Introduction to Auth0 for Ruby on Rails](https://blog.appsignal.com/2024/07/17/an-introduction-to-auth0-for-ruby-on-rails.html?ref=larsp.de)
- [GitHub - enjaku4/rabarber: Simple authorization library for Ruby on Rails](https://github.com/enjaku4/rabarber?ref=larsp.de)

```ruby
rails g sessions
```

### Bundling

- [Propshaft](https://propshaft-rails.com/?ref=larsp.de)

### Caching

- [An Introduction to HTTP Caching in Ruby On Rails](https://blog.appsignal.com/2024/08/14/an-introduction-to-http-caching-in-ruby-on-rails.html?ref=larsp.de)
- [HTTP Caching for Rails APIs: The Missing Performance Layer](https://www.prateekcodes.dev/rails-http-caching-strategies/?ref=larsp.de)
- [rails/solid_cache: A database-backed ActiveSupport::Cache::Store](https://github.com/rails/solid_cache?ref=larsp.de)

#### Memcache

- [How key-based cache expiration works – Signal v. Noise](https://signalvnoise.com/posts/3113-how-key-based-cache-expiration-works?ref=larsp.de)

```ruby
def get_ops client_id
  latest_import = ImportLog.maximum :updated_at
  cache_tag = "ops-#{client_id}-#{latest_import.iso8601}"
  Rails.cache.fetch(cache_tag, expires_in: 1.day) do
    Rails.logger.info("Cache miss for #{cache_tag}")
    Op.where(client_id: client_id).to_json
  end
end
```

### CAPTCHAs

- [https://github.com/ambethia/recaptcha](https://github.com/ambethia/recaptcha?ref=larsp.de)

### CLI

- [TableTennis](https://github.com/gurgeous/table_tennis?ref=larsp.de) is a Ruby library for printing stylish tables in your terminal

### CMS

- [AlchemyCMS](https://github.com/AlchemyCMS?ref=larsp.de)
- [Sitepress](https://sitepress.cc/?ref=larsp.de)

### Concurrency

```ruby
# Subprocess
pid = Process.fork do 
  long_process
end
Process.detach pid
```

### Config

ActiveSupport::Configurable

### Commerce

- [https://businessclasskit.com](https://businessclasskit.com/?ref=larsp.de) (SaaS with Gumroad integration)

### CSS

- [Install Tailwind CSS with Ruby on Rails](https://tailwindcss.com/docs/installation/framework-guides/ruby-on-rails?ref=larsp.de)
- [https://flowbite.com/docs/getting-started/rails/](https://flowbite.com/docs/getting-started/rails/?ref=larsp.de)

### Databases

- [CockroachDB](https://testdouble.com/insights/using-cockroachdb-with-rails?ref=larsp.de)
- [activerecord-sqlserver-adapter: SQL Server Adapter For Rails](https://github.com/rails-sqlserver/activerecord-sqlserver-adapter?ref=larsp.de)
- [kiba - Data processing & ETL framework for Ruby](https://github.com/thbar/kiba?ref=larsp.de)

#### Indices

**Exclude nulls from indexes**

A database index is a B-tree structure. It is very efficient when data has a high cardinality. However, when a column allows nulls, it often becomes the most redundant value. The index is less efficient and takes up more space. Unless null is an infrequently repeated value, there are only disadvantages to indexing them.

Exclude them when creating the index with a where clause.

```sql
add_index :table, :column, where: "(column IS NOT NULL)"
```

Or in pure SQL:

```sql
CREATE INDEX name ON table (column) \
  WHERE column IS NOT NULL;
```

**Do not index column with a low cardinality such as boolean**

The reason is the same as in the previous paragraph. B-tree indexes work best when cardinality is high. So a Boolean is the worst column you can index. So don't index booleans.

As with other types, if you have very repetitive values that are not significant from a business point of view, it's probably a good idea to exclude.

### Debugging

- [Prosopite](https://github.com/charkost/prosopite?ref=larsp.de) is able to auto-detect Rails N+1 queries

### Development

- [rails-erd: Generate Entity-Relationship Diagrams](https://github.com/voormedia/rails-erd?ref=larsp.de)
- [Rails 8 Copilot Instructions](https://github.com/Duartemartins/rails_copilot_instructions?ref=larsp.de)
- [GitHub Actions for Ruby projects](https://docs.github.com/de/actions/use-cases-and-examples/building-and-testing/building-and-testing-ruby?ref=larsp.de)
- [https://github.com/lape/devcontainer-rails](https://github.com/lape/devcontainer-rails?ref=larsp.de)
- [github/scientist: A Ruby library for carefully refactoring critical paths.](https://github.com/github/scientist?ref=larsp.de)

### Documentation

- [nshki/chusaku: Annotate your Rails controllers with route info.](https://github.com/nshki/chusaku?ref=larsp.de)

### Error Reporting and Exception Handling

- [Solid Errors](https://github.com/fractaledmind/solid_errors?ref=larsp.de) is a DB-based, app-internal exception tracker for Rails applications, designed with simplicity and performance in mind.

### Events

- [Rails Event Store](https://railseventstore.org/?ref=larsp.de)

### Files and Storage

```ruby
# tempfiles
Tempfile.open("voucher", Rails.root.join("tmp")) do |f|
  f.print(price.name)
  f.flush
end
```

### Forms

- [https://github.com/heartcombo/simple_form](https://github.com/heartcombo/simple_form?ref=larsp.de)
- [Multistep forms with Rails and the Wicked gem](https://avohq.io/blog/multistep-forms-rails?ref=larsp.de)

#### Date Picker

```erb
<%= f.text_field :birthday, label: t(:form_birthday),
    floating: true, required: true,
    data: {
      controller: "flatpickr",
      flatpickr_date_format: "d.m.Y",
      flatpickr_min_date: "1900-01-01",
      flatpickr_allow_input: true,
    }
%>
```

### Frontend

- [ViewComponent](https://viewcomponent.org/?ref=larsp.de)
- [Breadcrumbs](https://avohq.io/blog/breadcrumbs-rails?ref=larsp.de)
- [Rails Blocks](https://railsblocks.com/?ref=larsp.de) UI components
- [Hotwire dev tools](https://github.com/leonvogt/hotwire-dev-tools?ref=larsp.de)
- [RubyUI](https://rubyui.com/?ref=larsp.de) component library
- [Better StimulusJS Examples](https://www.betterstimulus.com/?ref=larsp.de)
- [Give a SPA Feel to Your Static Website with Hotwire's Turbo](https://marmelab.com/blog/2025/04/18/give-a-spa-feel-to-your-static-website-with-turbo.html?ref=larsp.de)
- [Phlex](https://www.phlex.fun/?ref=larsp.de)

### Gems

- [Ruby Toolbox](https://www.ruby-toolbox.com/?ref=larsp.de)

### Generators

```ruby
rails g scaffold_controller
rails g migration addAddressToOps address:reference
```

### Hosting

- [Dokku](https://larsp.de/dokku-open-source-heroku-alternative/)

### Howtos/Guides

- [https://github.com/hopsoft/rails_standards](https://github.com/hopsoft/rails_standards?ref=larsp.de)
- [Well-written code examples by 37signals](https://github.com/krschacht/37signals-rails-code?ref=larsp.de)
- [https://railsinspire.com/](https://railsinspire.com/?ref=larsp.de)
- [Boring Rails](https://boringrails.com/?ref=larsp.de)
- [ankane/production_rails: Best practices for running Rails in production](https://github.com/ankane/production_rails?ref=larsp.de)
- [eliotsykes/real-world-rails: Real World Rails applications and their open source codebases for developers to learn from](https://github.com/eliotsykes/real-world-rails?ref=larsp.de)

### Images

- [Fileboost](https://fileboost.dev/?ref=larsp.de) - Supercharge Your Rails Images

### Jobs

- [https://mileswoodroffe.com/articles/solid-queue-and-mission-control](https://mileswoodroffe.com/articles/solid-queue-and-mission-control?ref=larsp.de)
- [https://dev.37signals.com/introducing-solid-queue](https://dev.37signals.com/introducing-solid-queue?ref=larsp.de)
- [https://github.com/rails/mission_control-jobs](https://github.com/rails/mission_control-jobs?ref=larsp.de)
- [https://www.driftingruby.com/episodes/processing-large-jobs](https://www.driftingruby.com/episodes/processing-large-jobs?ref=larsp.de)
- SOLID_QUEUE_IN_PUMA=1
- [chrono_forge](https://github.com/radioactive-labs/chrono_forge?ref=larsp.de) - a robust framework for building durable, distributed workflows in Ruby on Rails applications

### Logging

![log_bench terminal UI preview](/images/posts/ruby-on-rails-resources/logbench-preview.png)

**log_bench**

- [log_bench](https://github.com/silva96/log_bench?ref=larsp.de) - A terminal-based Rails log viewer with real-time monitoring and filtering capabilities
- [Internal product analytics with Ahoy](https://railsnotes.xyz/blog/ahoy-product-analytics?ref=larsp.de)

#### Honeybadger

```ruby
Honeybadger.event("SUCCESS", 
  { message: "A new customer just signed up" })
```

### Mail

- [joshmn/caffeinate: A Rails engine for drip campaigns/scheduled sequences and periodical support. Works with ActionMailer, and other things.](https://github.com/joshmn/caffeinate?ref=larsp.de)

### Migration

[https://www.akshaykhot.com/rails-database-migrations-cheatsheet/](https://www.akshaykhot.com/rails-database-migrations-cheatsheet/?ref=larsp.de)

**Load schema instead of migrations**

```ruby
rake db:schema:load
```

If you're on the latest (8) version of Ruby on Rails, there's a nice shortcut to add the not null modifier to your database columns. Just add an exclamation mark after the type, and Rails will mark that column as not null.

```ruby
rails generate migration CreateUsers \
  email_address:string!:uniq password_digest:string!
```

### MySQL

```sql
ALTER USER 'opos'@'localhost' \
  IDENTIFIED WITH mysql_native_password BY 'opos';
```

[Multiple Databases with Active Record — Ruby on Rails Guides](https://guides.rubyonrails.org/active_record_multiple_databases.html?ref=larsp.de)

```ruby
# models/application_record.rb     
class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
  connects_to database: {writing: :primary, reading: :primary_replica}
end
```

### Payment

- [Active Merchant](https://github.com/activemerchant/active_merchant?ref=larsp.de) is a simple payment abstraction library extracted from Shopify
- [Pay gem](https://github.com/pay-rails/pay?ref=larsp.de) - used in [Jumpstart Pro](https://jumpstartrails.com/?ref=larsp.de)

### PDF

- [https://github.com/prawnpdf/prawn](https://github.com/prawnpdf/prawn?ref=larsp.de)
- [Barcode PDFs](https://larsp.de/barcode-pdfs-with-ruby-on-rails/)

### PostgreSQL

- [https://github.com/pawurb/rails-pg-extras](https://github.com/pawurb/rails-pg-extras?ref=larsp.de)

### Proxy

[37signals Dev — Thruster HTTP/2](https://dev.37signals.com/thruster-released/?ref=larsp.de)

### Redis

[How to use Redis with Rails? - Stack Overflow](https://stackoverflow.com/questions/50985766/how-to-use-redis-with-rails?ref=larsp.de)

### Rich Text

[https://dante-editor.dev](https://dante-editor.dev/?ref=larsp.de)

### Routing

[Rails Router Handbook](https://books.writesoftwarewell.com/3/rails-router?ref=larsp.de)

### Search

- [Typesense](https://avohq.io/blog/intelligent-search-in-rails-with-typesense?ref=larsp.de)
- [The Art of Form Objects: Elegant Search Filtering in Rails](https://jetthoughts.com/blog/art-of-form-objects-elegant-search/?ref=larsp.de)

### Security

#### Rate limiting

- [Rate Limiting](https://mileswoodroffe.com/articles/rails-rate-limiting?ref=larsp.de)
- [Rails 8 adds ability to use multiple rate limits per controller](https://www.prateekcodes.dev/rails-8-multiple-rate-limits-per-controller/?ref=larsp.de)

### Scraping

[https://github.com/glaucocustodio/tanakai](https://github.com/glaucocustodio/tanakai?ref=larsp.de)

### Storage

- [Active Storage Overview — Ruby on Rails Guides](https://edgeguides.rubyonrails.org/active_storage_overview.html?ref=larsp.de)
- [Using Active Storage in Rails 7](https://pragmaticstudio.com/tutorials/using-active-storage-in-rails?ref=larsp.de)

```ruby
# Purge orphan files and blob records
ActiveStorage::Blob.unattached.each(&:purge)
```

### SQLite

- [https://github.com/fractaledmind/litestream-ruby](https://github.com/fractaledmind/litestream-ruby?ref=larsp.de)
- Must have (according to [Stephen Margheim at RailsConf 2024](https://youtu.be/3GfLdP3E1bo?ref=larsp.de)): [https://github.com/fractaledmind/activerecord-enhancedsqlite3-adapter](https://github.com/fractaledmind/activerecord-enhancedsqlite3-adapter?ref=larsp.de)
- [https://github.com/fractaledmind/litestream-ruby](https://github.com/fractaledmind/litestream-ruby?ref=larsp.de)

### Testing

- [Environment variables with climate_control](https://github.com/thoughtbot/climate_control?ref=larsp.de)
- [https://buttondown.com/kaspth/archive/why-is-oaken-for-your-database-seeds-test-data/](https://buttondown.com/kaspth/archive/why-is-oaken-for-your-database-seeds-test-data/?ref=larsp.de)
- [Exploring the FFaker Gem - A Comprehensive Guide | Shakacode](https://www.shakacode.com/blog/exploring-the-ffaker-gem/?ref=larsp.de)

#### Minitest

- [Minitest Style Guide](https://minitest.rubystyle.guide/?ref=larsp.de)
- [Minitest Cheat Sheet](https://www.rubypigeon.com/posts/minitest-cheat-sheet/?ref=larsp.de)

```ruby
# test_helper.rb
# Set up minitest-reporters to show a 
# spec-style progress report.
require "minitest/reporters"
Minitest::Reporters.use! 
  [Minitest::Reporters::SpecReporter.new]
```

#### Capybara System Tests

```ruby
bin/rails generate system_test users
```

#### Test Coverage

```ruby
# test_helper.rb
require "simplecov"
SimpleCov.start "rails"
```

### Templates/ERB

#### Disable Turbo

```erb
<%= link_to l.to_s.upcase, "/#{l}", 
  class: ("active" if locale == l), 
  data: {"turbo": false } %>
```

### Translation

- [Rails translation cheatsheet](https://larsp.de/rails-translation-cheatsheet/)

### Updating

- [Using VS Code as a Rails app:update merge tool](https://davidrunger.com/blog/using-vs-code-as-a-rails-app-update-merge-tool?ref=larsp.de)
- [Rails - Migrating from Sprockets to Propshaft](https://discuss.rubyonrails.org/t/rails-migrating-from-sprockets-to-propshaft/87992?ref=larsp.de)
- [https://rubyonrails.org/2024/11/7/rails-8-no-paas-required](https://rubyonrails.org/2024/11/7/rails-8-no-paas-required?ref=larsp.de)
- [https://gorails.com/series/whats-new-in-rails-8](https://gorails.com/series/whats-new-in-rails-8?ref=larsp.de)

### URLs

- [Canonical URLs](https://avohq.io/blog/canonical-urls-rails?ref=larsp.de)

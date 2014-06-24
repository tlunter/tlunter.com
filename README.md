# tlunter.com

In order to use properly, you must add a password for MySQL in `config/database.rb` after the colon.

## Dependencies:

1. Ruby 2+
2. MySQL (or drop-in replacement)
3. redis
4. npm
5. grunt
6. bower

## Recommended install:

1.  Install rbenv and ruby-build

        git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
        git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build

2.  Install Ruby 2+

        rbenv install 2.1.2

3.  Install redis
    *   This is best installed through some package manager
    1.  Arch: `(sudo )pacman -S redis`
    2.  Ubuntu: `(sudo )apt-get install redis-server`
    3.  Mac: `brew install redis`
4.  Install MySQL
    *   This is best installed through some package manager
    1.  Arch: `(sudo )pacman -S mariadb libmariadbclient`
    2.  Ubuntu: `(sudo )apt-get install mysql-server`
    3.  Mac: `brew install mysql`
5.  Install bundler

        gem install bundler

6.  Install node
    *   This is best installed through some package manager. Otherwise http://nodejs.org/download/
    1.  Arch: `(sudo )pacman -S nodejs`
    2.  Mac: `brew install node`
7.  Install grunt

        (sudo )npm install -g grunt-cli

8.  Install bower

        (sudo )npm install -g bower

9.  Get bower components

        bower install

10. Run grunt

        grunt

11. Run bundle

        bundle

12. Run foreman

        bundle exec foreman start

13. Make database tables

        bundle exec pry
        [1] pry(main)> require './app'
        => true
        [2] pry(main)> DataMapper.auto_upgrade!
        => #<DataMapper::DescendantSet:0x007fc7e98be968
         @descendants=
          #<DataMapper::SubjectSet:0x007fc7e98be918
           @entries=
            #<DataMapper::OrderedSet:0x007fc7e98be878
             @cache=
              #<DataMapper::SubjectSet::NameCache:0x007fc7e98be800
               @cache={"User"=>0, "Post"=>1, "Comment"=>2}>,
             @entries=[User, Post, Comment]>>>

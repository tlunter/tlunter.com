FROM        base/arch
MAINTAINER  Todd Lunter <tlunter@gmail.com>
RUN         pacman -Syy
RUN         pacman -S --noconfirm ruby git base-devel libmariadbclient
RUN         gem install bundler --no-user-install
ADD         . /app
RUN         cd /app && bundle install
CMD         cd /app && bundle exec foreman start

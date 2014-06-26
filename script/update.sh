#!/bin/bash

branch="$1"
[[ -z $branch ]] && branch="master"

echo "Pulling latest master"
git fetch origin > /dev/null
if [ $? != 0 ]; then
    echo "Failed to fetch origin"
    exit
fi

echo "Checking out $branch"
git checkout $branch > /dev/null 2>&1
if [ $? != 0 ]; then
    echo "Failed to checkout $branch"
    exit
fi

echo "Merging remote $branch"
git merge origin/$branch > /dev/null 2>&1
if [ $? != 0 ]; then
    echo "Failed to merge origin/$branch"
    exit
fi

gem list --local | grep "bundler" > /dev/null
if [ $? != 0 ]; then
    echo "Installing bundle"
    sudo gem install bundler > /dev/null
    if [ $? != 0 ]; then
        echo "Failed to install bundle"
        exit
    fi
fi

pacman -Qs nodejs > /dev/null
if [ $? != 0 ]; then
    echo "Installing NodeJS"
    sudo pacman -S --noconfirm nodejs > /dev/null
    if [ $? != 0 ]; then
        echo "Failed to install NodeJS"
        exit
    fi
fi

echo "Updating NPM"
npm update > /dev/null 2>&1
if [ $? != 0 ]; then
    echo "Failed to update NPM"
    exit
fi

which grunt > /dev/null
if [ $? != 0 ]; then
    echo "Installing Grunt"
    sudo npm install -g grunt-cli > /dev/null
    if [ $? != 0 ]; then
        echo "Failed to install Grunt"
        exit
    fi
fi

which bower > /dev/null
if [ $? != 0 ]; then
    echo "Installing Bower"
    sudo npm install -g bower > /dev/null
    if [ $? != 0 ]; then
        echo "Failed to install bower"
        exit
    fi
fi

echo "Installing bower components"
bower install > /dev/null
if [ $? != 0 ]; then
    echo "Failed to install bower components"
    exit
fi

echo "Running grunt"
grunt > /dev/null
if [ $? != 0 ]; then
    echo "Failed running grunt"
    exit
fi

echo "Running bundle"
bundle > /dev/null
if [ $? != 0 ]; then
    echo "Failed running bundle"
    exit
fi

echo "Done!"

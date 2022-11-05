#!bin/sh

mkdir -p ~/.config/fish/

touch ~/.config/fish/config.fish

echo -e "set fish_greeting\nstarship init fish | source" >> ~/.config/fish/config.fish

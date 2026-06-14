q#unix
Using a bare repository:
```bash
git init --bare $HOME/.dotfiles
alias config='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'
config config --local status.showUntrackedFiles no
echo "alias config='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'" >> $HOME/fish/config.fish
```
- we create an alias `config` which we will use instead of the regular `git` when we want to interact with our configuration repository.
- we set a flag - local to the repository - to hide files we are not explicitly tracking yet. This is so that when you type `config status` and other commands later, files you are not interested in tracking will not show up as `untracked`.

Again as a shortcut not to have to remember all these steps on any new machine you want to setup, you can create a simple script, [store it as Bitbucket snippet](https://bitbucket.org/snippets/nicolapaolucci/7rE9K) ,[create a short url](http://bit.do/) for it and call it like this:[^1]

```bash
curl -Lks http://bit.do/cfg-install | /bin/bash
```

[^1]: https://www.atlassian.com/git/tutorials/dotfiles

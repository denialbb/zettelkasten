---
date: "\\[2022-03-29 Tue 18:30\\]"
id: 85751588-ddf3-46a3-9ee1-2a76d1bf2402
title: Anaconda
---

A [[Python]] Data Science Platform. To install in [[NixOS]] see [this](http://www.jaakkoluttinen.fi/blog/conda-on-nixos/) great post, the author defined a nix expression:

<div class="source">

\## ~/.conda-shell.nix { pkgs ? import \<nixpkgs\> {} }:

let

installationPath = "~/.conda";

minicondaScript = pkgs.stdenv.mkDerivation rec { name = "miniconda-\${version}"; version = "4.3.11"; \# check for latest version (ATTOW 4.11.0) src = pkgs.fetchurl { url = "<https://repo.continuum.io/miniconda/Miniconda3-$%7Bversion%7D-Linux-x86_64.sh>"; sha256 = "1f2g8x1nh8xwcdh09xcra8vd15xqb5crjmpvmc2xza3ggg771zmr"; };

unpackPhase = "true";

installPhase = '' mkdir -p \$out cp \$src \$out/miniconda.sh '';

fixupPhase = '' chmod +x \$out/miniconda.sh ''; };

conda = pkgs.runCommand "conda-install" { buildInputs = \[ pkgs.makeWrapper minicondaScript \]; } '' mkdir -p \$out/bin makeWrapper \\ \${minicondaScript}/miniconda.sh \\ \$out/bin/conda-install \\ –add-flags "-p \${installationPath}" \\ –add-flags "-b" '';

in ( pkgs.buildFHSUserEnv { name = "conda"; targetPkgs = pkgs: ( with pkgs; \[

conda

xorg.libSM xorg.libICE xorg.libXrender libselinux

gcc

emacs git

\] ); profile = ''

export PATH=\${installationPath}/bin:\$PATH

export NIX<sub>CFLAGSCOMPILE</sub>="-I\${installationPath}/include" export NIX<sub>CFLAGSLINK</sub>="-L\${installationPath}lib"

export FONTCONFIG<sub>FILE</sub>=/etc/fonts/fonts.conf export QTCOMPOSE=\${pkgs.xorg.libX11}/share/X11/locale ''; } ).env

</div>

Then you enter the environment with `nix-shell ~/.conda-shell.nix`

#!/bin/bash

git log -1 --pretty=oneline --abbrev-commit | grep -w "\[skip deploy\]" && exit 0 || exit 1
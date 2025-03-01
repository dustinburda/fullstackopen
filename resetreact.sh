#!/bin/bash

directory_path="$1"


rm -r $directory_path"public"
rm -r $directory_path"src/assets"
rm $directory_path"src/App.css"
rm $directory_path"src/index.css"

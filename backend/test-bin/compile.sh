#!/bin/bash

set -e

echo "Compiling C++ test programs..."

for file in *.cpp; do
  exe_name="${file%.cpp}.out"
  echo "Compiling $file -> $exe_name"
  g++ -std=c++17 -O2 "$file" -o "$exe_name"
done

echo "Compilation completed successfully."

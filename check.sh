#!/usr/bin/env bash
# Pre-publish gate. Exits non-zero while any placeholder is still visible.
# LAWYER / CA comments are listed, not failed: they are questions, not blanks.
set -u
cd "$(dirname "$0")/docs"
fail=0
echo "== Visible placeholders (must be zero to publish) =="
if grep -rn --include=*.html 'class="fill"' . ; then fail=1; else echo "none"; fi
echo
echo "== FILL-IN comments =="
grep -rn --include=*.html 'FILL-IN' . || echo "none"
echo
echo "== Open LAWYER / CA / CHECK / PENDING-DECISION notes =="
grep -rn --include=*.html -E 'LAWYER|CA:|CHECK:|PENDING-DECISION' . | sed 's/^\(.\{160\}\).*/\1…/' || echo "none"
echo
echo "== Internal links resolve =="
broken=0
for f in $(find . -name '*.html'); do
  dir=$(dirname "$f")
  for href in $(grep -o 'href="[^"#:]*"' "$f" | sed 's/href="//; s/"$//'); do
    case "$href" in /*) t=".${href}" ;; *) t="$dir/$href" ;; esac
    [ -d "$t" ] && t="$t/index.html"
    [ -e "$t" ] || { echo "BROKEN: $f -> $href"; broken=1; fail=1; }
  done
done
[ $broken -eq 0 ] && echo "all links ok"
exit $fail

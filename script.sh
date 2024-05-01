#!/bin/bash

git log -1 --pretty=oneline --abbrev-commit | grep -w "\[skip deploy\]" && echo $SKIP_DEPLOY=true || $SKIP_DEPLOY=false
if [["$SKIP_DEPLOY" == false]];then
    echo "🛑 - Build cancelled"
  exit 1;

else
    echo "✅ - Build can proceed"
    exit 0;
fi
# echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

# if [[ "$VERCEL_GIT_COMMIT_REF" == "staging" || "$VERCEL_GIT_COMMIT_REF" == "main"  ]] ; then
#   # Proceed with the build
#     echo "✅ - Build can proceed"
#   exit 1;

# else
#   # Don't build
#   echo "🛑 - Build cancelled"
#   exit 0;
# fi
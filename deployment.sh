TARGET=/srv/www/nueleanu
PIPELINE=/srv/www/nueleanu-pipeline

mkdir -p $TARGET

if [ ! -d $PIPELINE ]; then
  git clone https://github.com/MihaiNueleanu/blog $PIPELINE
else
  cd $PIPELINE
  git pull
fi

cd $PIPELINE

[ $(cat previous-version.txt 2> /dev/null) ] && PREVIOUS=$(cat previous-version.txt) || PREVIOUS='NULL'
CURRENT=$(git rev-parse HEAD)

echo 'PREVIOUS VERSION --> '$PREVIOUS;
echo 'CURRENT VERSION --> '$CURRENT;

if [ $CURRENT != $PREVIOUS ]; then
  npm install
  npm run build

  cp -a ./_site/. $TARGET

  git rev-parse HEAD > previous-version.txt
fi


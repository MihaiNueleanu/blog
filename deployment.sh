mkdir -p /srv/www/nueleanu


if [ ! -d /srv/www/nueleanu-pipeline ]; then
  git clone https://github.com/MihaiNueleanu/blog /srv/www/nueleanu-pipeline
else
  PREVIOUS_VERSION=$(cat /srv/www/nueleanu-pipeline/.git/HEAD)
  git pull /srv/www/nueleanu-pipeline
fi

cd /srv/www/nueleanu-pipeline

npm install
npm run build

cp -a ./_site/. /srv/www/nueleanu
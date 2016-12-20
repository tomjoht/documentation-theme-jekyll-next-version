echo "Build English site..."
bundle exec jekyll build --destination outputs/;
echo "Done"
echo "Building Japanese site ..."
bundle exec jekyll build --config _config_ja.yml --destination outputs/ja/;
echo "Done"
echo "Building German site ..."
bundle exec jekyll build --config _config_de.yml --destination outputs/de/;
echo "Done"
echo "Applying any changes to s3 config file..."
s3_website cfg apply;
echo "Done"
echo "Syncing modified files with AWS S3..."
s3_website push;
echo "Done. View your site at http://devportaldocs.s3-website-us-west-1.amazonaws.com/"

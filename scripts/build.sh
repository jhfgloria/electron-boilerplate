# clean everything
echo "===================CLEANING DELIVERABLES==================="
rm -rf dist
rm -rf bin
# install dependencies
echo "===================INSTALLING DEPENDENCIES==================="
npm install
# build bundles
echo "===================BUILDING PROD DELIVERABLES==================="
npm run build:prod
# build electron app
echo "===================BUILDING ELECTRON APP==================="
mkdir bin
cd bin
wget https://github.com/electron/electron/releases/download/v6.0.12/electron-v6.0.12-darwin-x64.zip
unzip electron-v6.0.12-darwin-x64.zip
rm electron-v6.0.12-darwin-x64.zip
mkdir app
cp ../dist/** app/
cp ../package.json app/
mv LICENSE** version app/
../node_modules/.bin/asar pack app app.asar
rm -rf app
mv app.asar Electron.app/Contents/Resources/
cd ..
echo "===================ELECTRON APP READY TO BE USED==================="
# end of script
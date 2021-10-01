const moduleAlias = require('module-alias');
import * as path from 'path';
const srcPath = __dirname;
const serverRoot = path.resolve('..');
const serverAssets = path.resolve('..', 'assets');
const modulesPath = path.join(srcPath, 'modules');
const routesPath = path.join(srcPath, 'routes');
const configsPath = path.join(srcPath, 'configs');
const helpersPath = path.join(srcPath, 'helpers');
const moderlsPath = path.join(srcPath, 'models');

const pathsArr = [
    {
        moduleAlias     : '@serverRoot',
        pathName        : 'SERVER_ROOT',
        path            : serverRoot
    },
    {
        moduleAlias     : null,
        pathName        : 'SERVER_ASSETS',
        path            : serverAssets
    },
    {
        moduleAlias     : '@root',
        pathName        : 'SRC_PATH',
        path            : srcPath
    },
    {
        moduleAlias     : '@modules',
        pathName        : 'MODULES_PATH',
        path            : modulesPath
    },
    {
        moduleAlias     : '@routes',
        pathName        : 'ROUTES_PATH',
        path            : routesPath
    },
    {
        moduleAlias     : '@configs',
        pathName        : 'CONFIGS',
        path            : configsPath
    },
    {
        moduleAlias     : '@helpers',
        pathName        : 'HELPERS',
        path            : helpersPath
    },
    {
        moduleAlias     : '@models',
        pathName        : 'MODELS',
        path            : moderlsPath
    }
    
];

let pathsObj: any = {};
let moduleAliasObj: any = {};

for (const path of pathsArr) {
    const mAlias = path.moduleAlias;
    const pathName = path.pathName;
    const pathDir = path.path;
    pathsObj[pathName] = pathDir;
    if (mAlias) {
        moduleAliasObj[mAlias] = pathDir;
    }
}
moduleAlias.addAliases(moduleAliasObj);
export default pathsObj;
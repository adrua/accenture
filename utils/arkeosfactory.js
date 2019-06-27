const axios = require('axios')
const fs = require('fs')
const path = require('path')
const ts = require('typescript')

const opcionesArtifactos = {
  name: {
      demand: true,
      alias: 'n',
      describe: 'Name of Arkeos Factory component'
  },
  robot: {
      alias: 'r',
      default: 'Angular2Material',
      describe: 'Name of Robot or Templates set will be use for generation of source code'
  },
  backend: {
      alias: 'b',
      default: false,
      describe: 'Make integration on backend code'
  }
};

const argv = require('yargs')
        .option('name',  opcionesArtifactos.name)
        .option('robot', opcionesArtifactos.robot)
        .help()
        .argv;

const artifacto = {
  type: 'FCT',
  name: argv.name,
  subtipo: argv.robot
}

const dirSrc = path.join(__dirname ,'../src/app');

const urlFactory = `http://arkeosproduccion.azurewebsites.net/dba_Factory_1970_MLKBOG`;
const url = `${urlFactory}/dba_FactoryEdit_1970_MLKBOG/Imports/${artifacto.type}-${artifacto.name}`;

axios.post(url, artifacto)
.then((res) => {
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res.data.Artifactos[0])
  console.log(res.data.NameArtifactos)
  //console.log(res.data)
  //modMaterial(res.data)
  copyMaterial(res.data)
})
.catch((error) => {
  console.error(error.toString());
})

const regExImport = /import\s+{\s*AppComponent\s+}\s+from\s+'\.\/app\.component'.*[\n\r]+/gi
const regExEntryCmp = /[\s\n\r]*entryComponents[\s\n\r]*:[\s\n\r]*\[[^\]]*/gi
const regExDeclCmp = /[\s\n\r]*declarations[\s\n\r]*:[\s\n\r]*\[[^\]]*/gi

function copyMaterial(data) {
  //data.Artifactos = {}
  //console.log(data);
  const _dirCmp = data.RootName.replace(".","_").toLowerCase();
  const dirCmp = path.join(dirSrc ,`${_dirCmp}`);

  if (!fs.existsSync(dirCmp)){
      fs.mkdirSync(dirCmp);
  }

  //Copiar artifactos componentes 
  var impCmp = '';
  var declCmp = '';
  var entryCmp = '';

  data.TipoArtifactos.filter(function(value, index) {
    if(value === '.ts' || value === '.html') {
      const fileName = path.join(dirCmp, data.NameArtifactos[index] + value);
      fs.writeFile(fileName, data.Artifactos[index], function(err) {
          if(err) {
              return console.log(err);
          }

          console.log(`${data.NameArtifactos[index] + value} on '${dirCmp}' The file was saved!`);
      }); 
    }

    if(value === '.html') {
        impCmp += `import { ${data.ObjectNames[index]} } from './${_dirCmp}/${data.NameArtifactos[index]}';\n`;
        declCmp += `,\n\t\t${data.ObjectNames[index]}`;
        if(data.ObjectNames[index].endsWith("_Dialog")) {
          entryCmp += `,\n\t\t${data.ObjectNames[index]}`;
        }
    }
  });

  //agregar componentes al modulo 
  const appModule = path.join(dirSrc, 'app.module.ts');
  fs.readFile(appModule, function(err, data) {
    if (err) { 
      console.log(err) 
    } else {
      regExImport.test(data);
      data = data.slice(0, regExImport.lastIndex) + impCmp + data.slice(regExImport.lastIndex);

      regExEntryCmp.test(data);
      data = data.slice(0, regExEntryCmp.lastIndex) + entryCmp + data.slice(regExEntryCmp.lastIndex);

      regExDeclCmp.test(data);
      data = data.slice(0, regExDeclCmp.lastIndex) + declCmp + data.slice(regExDeclCmp.lastIndex);

      fs.writeFile(appModule, data, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log(`app.module.ts on '${dirSrc}' The file was modified!`);
        }
      }); 
    }
  })

}

function modMaterial(data) {
  const appModule = path.join(dirSrc, 'app.module.ts');
  let options = {
    noEmitOnError: true,
    noImplicitAny: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS
  };

  let sourceFile = ts.createSourceFile(appModule, fs.readFileSync(appModule).toString(), ts.ScriptTarget.ES2015, true);
  console.log(sourceFile)
  fs.writeFile(appModule.replace('.ts','.ast.json'), JSON.stringify(sourceFile), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log(`app.module.ts on '${dirSrc}' The file was modified!`);
    }
  }); 

}
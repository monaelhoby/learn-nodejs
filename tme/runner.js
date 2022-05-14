const fs= require('fs')
const path = require('path')
const { Z_PARTIAL_FLUSH } = require('zlib')


class Runner{
    constructor(){
        this.testFile = []
    }

    async collectFiles(targetPath){
        const files = await fs.promises.readdir(targetPath)
        
        for(let file of files){
            const filePath = path.join(targetPath, file)
            const states = await fs.promises.lstat(filePath)

            if(states.isFile() && file.includes('.test.js')){
                this.testFile.push({name: filePath})
            }else if(states.isDirectory){
                const childFiles = await fs.promises.readdir(filePath)
                files.push(...childFiles.map(f => path.join(file, f)))
            }
        }
    }
}

module.exports = Runner
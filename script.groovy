#!/usr/bin/env groovy
def deployImg(){
          lock('deploy_AAC_FE_lock'){
            sshagent(['aac']) {
              sh """
                ssh -o StrictHostKeyChecking=no -tt ubuntu@192.168.100.131 '
                  cd aac/AAC-FE
                  git pull origin dev
                  docker system prune -a -f
                  docker compose up -d --build
                  
                '
              """
            }
    
          }

}
return this


  
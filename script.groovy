#!/usr/bin/env groovy
def deployImg(){
          lock('deploy_lock'){
            sshagent(['AAC']) {
              sh """
                ssh -o StrictHostKeyChecking=no -tt ubuntu@35.178.203.40 '
                  cd AAC-FE
                  git pull origin dev
                  npm i
                  docker compose up -d --build
                  docker system prune -a -f
                '
              """
            }
    
          }

}
return this



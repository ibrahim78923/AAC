#!/usr/bin/env groovy
def deployImg(){
          lock('deploy_AAC_FE_lock'){
            sshagent(['AAC']) {
              sh """
                ssh -o StrictHostKeyChecking=no -tt ubuntu@18.171.60.181 '
                  cd AAC-FE
                  git pull origin dev
                  docker compose up -d --build
                  docker system prune -a -f
                '
              """
            }
    
          }

}
return this


  
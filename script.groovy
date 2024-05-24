#!/usr/bin/env groovy
def deployImg(){
          lock('aac_fe_stg'){
            sshagent(['aac-stg']) {
              sh """
                ssh -o StrictHostKeyChecking=no -tt ubuntu@18.169.81.198 '
                  cd aac/AAC-FE
                  git pull origin staging
                  docker system prune -a -f
                  docker compose up -d --build
                  
                '
              """
            }
    
          }

}
return this


  
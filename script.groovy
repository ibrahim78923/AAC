#!/usr/bin/env groovy
def deployImg(){
            sshagent(['AAC-BE']) {
              sh """
                ssh -o StrictHostKeyChecking=no -tt ubuntu@18.132.216.80 '
                  cd AAC-FE
                  git pull origin dev-morning
                  docker compose up -d --build
                  docker system prune -a -f
                '
              """
            }
    
          }
return this

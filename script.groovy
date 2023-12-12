#!/usr/bin/env groovy
def deployImg(){
            sshagent(['AAC']) {
              sh """
                ssh -o StrictHostKeyChecking=no -tt ubuntu@35.178.203.40 '
                  cd AAC-FE
                  git pull origin dev
                  docker compose up -d --build
                  docker system prune -a -f
                '
              """
            }
    
          }
return this

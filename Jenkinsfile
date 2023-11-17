#!/usr/bin/env groovy
def gv
pipeline{
    agent any
    stages{
        stage('Initialization'){
            steps{
                script{
                    gv=load 'script.groovy'
                }
            }
        }
        
        stage('Deploying Image'){
            steps{
                script{
                    gv.deployImg()

                }
            }
        }
    }
}
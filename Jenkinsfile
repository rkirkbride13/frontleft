pipeline {
	agent any

	stages {
		stage('Checkout') {
			steps {
				checkout scm
			}
		}
    stage('Frontend tests') {
	    steps {
        dir('api') {
          sh 'npm install'
          sh 'npm run start'
        }
        dir('app') {
          sh 'npm install'
          sh 'npm run start'
          sh 'npm run test'
        }
      }
    }
	}
}
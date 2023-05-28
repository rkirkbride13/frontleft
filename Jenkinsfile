pipeline {
	agent any

	stages {
		stage('Checkout') {
			steps {
				checkout scm
			}
		}
    stage('Check Environment') {
            steps {
                sh 'printenv'
            }
        }
    stage('Frontend tests') {
	    steps {
        dir('api') {
          sh 'npm ci'
          sh 'npm run start'
        }
        dir('app') {
          sh 'npm ci'
          sh 'npm run start'
          sh 'npm run test'
        }
      }
    }
	}
}
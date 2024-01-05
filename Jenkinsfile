
pipeline {
	agent any
	stages {
		stage('Clone Git Repo'){
				steps{
					git 'https://github.com/984Sathish/CypressAutomationPractice.git'
		    }
		}
		stage('Install Dependencies'){
				steps{
					bat 'npm install'
				}
		}
		stage('Run Tests'){
				steps{
					bat 'npm run cy:chrome'
				}
		}
		stage('Publish HTML Report'){
				steps{
					publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'cypress/reports/html', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
				}
		}
	}
}
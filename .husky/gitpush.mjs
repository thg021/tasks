import { execSync } from 'child_process';
import inquirer from 'inquirer';

const allQuestions = async () => {
  const { pushNowAnswers } = await inquirer.prompt([
    {
      type: 'list',
      name: 'pushNowAnswers',
      message: '🚀 Do you want to push this commit now?',
      choices: ['yes', 'no']
    }
  ]);

  if (pushNowAnswers === 'yes') {
    const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf8'
    });

    const branchName =
      currentBranch && typeof currentBranch === 'string' && currentBranch !== ''
        ? currentBranch.trim()
        : '';

    const checkBranchName = async (input) => input && input.trim() !== '';

    const { branchNameAnswers } = await inquirer.prompt([
      {
        name: 'branchNameAnswers',
        message: '📦 Branch name:',
        default: branchName,
        validate: checkBranchName
      }
    ]);

    if (branchNameAnswers) execSync(`git push origin ${branchNameAnswers} --tags`);
  }
};

allQuestions();

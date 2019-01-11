module.exports = {
  'install git': [
    {
      description: 'Install git on macOS with Homebrew',
      command: 'brew install git',
      keywords: ['install', 'macos', 'homebrew']
    },
    {
      description: 'Install git on Debian-based linux',
      command: 'sudo apt-get install git',
      keywords: ['install', 'apt-get', 'debian', 'linux']
    },
    {
      description: 'Install git on Windows with Chocolatey',
      command: 'choco install git',
      keywords: ['install', 'windows', 'choco']
    }
  ],
  configuration: [
    {
      description: 'Sets the name you want attached to your commit transaction',
      command: 'git config --global user.name [name]',
      keywords: ['configuration', 'name', 'email', 'user']
    },
    {
      description: 'Sets the email you want atached to your commit transactions',
      command: 'git config --global user.email [email address]',
      keywords: ['configuration', 'name', 'email', 'user']
    },
    {
      description: 'Enables helpful colorization of command line output',
      command: 'git config --global color.ui auto',
      keywords: ['configuration', 'color', 'ui', 'customization']
    }
  ],
  'create repo': [
    {
      description: 'Creates a new local repository with the specified name',
      command: 'git init [project-name]',
      keywords: ['new', 'project', 'create']
    },
    {
      description: 'Downloads a project and its entire version history',
      command: 'git clone [url]',
      keywords: ['download', 'remote', 'clone', 'checkout']
    }
  ],
  'make changes': [
    {
      description: 'Lists all new or modified files to be commited',
      command: 'git status',
      keywords: ['change', 'modifications', 'commit']
    },
    {
      description: 'Shows file differences not yet staged',
      command: 'git diff',
      keywords: ['modifications', 'changes', 'diff']
    },
    {
      description: 'Add the specified file to the staging area',
      command: 'git add [file]',
      keywords: []
    },
    {
      description: 'Shows file differences between staging and the last file version',
      command: 'git diff --staged',
      keywords: ['modifications']
    },
    {
      description: 'Unstages the file, but preserve its contents',
      command: 'git reset [file]',
      keywords: []
    },
    {
      description: 'Records staged snapshots in version history',
      command: 'git commit -m [descriptive message]',
      keywords: []
    },
    {
      description: 'Undoes all commits afer [commit], preserving changes locally',
      command: 'git reset [commit]',
      keywords: []
    },
    {
      description: 'Discards all history and changes back to the specified commit',
      command: 'git reset --hard [commit]',
      keywords: []
    },
    {
      description: 'Discards all local changes in the working directory',
      command: 'git reset –hard HEAD',
      keywords: []
    }
  ],
  branches: [
    {
      description: 'Lists all local branches in the current repository',
      command: 'git branch',
      keywords: []
    },
    {
      description: 'Creates a branch',
      command: 'git branch [branch-name]',
      keywords: []
    },
    {
      description: 'Merges the specified branch’s history into the current branch',
      command: 'git merge [branch-name]',
      keywords: []
    },
    {
      description: 'Switches to the specified branch',
      command: 'git checkout [branch-name]',
      keywords: []
    },
    {
      description: 'Creates a branch and switch to it',
      command: 'git checkout -b [branch-name]',
      keywords: []
    },
    {
      description: 'Rename a branch',
      command: 'git checkout -m [new-branch-name]',
      keywords: []
    },
    {
      description: 'Deletes the specified branch, locally',
      command: 'git branch -d [branch-name]',
      keywords: []
    }
  ],
  stashing: [
    {
      description: 'Restores the most last stashed files and deletes the stashed changeset',
      command: 'git stash pop',
      keywords: []
    },
    {
      description: 'Temporarily stores all modified tracked files',
      command: 'git stash',
      keywords: []
    },
    {
      description: 'Lists all stashed changesets',
      command: 'git stash list',
      keywords: []
    },
    {
      description: 'Deletes the last stashed changeset',
      command: 'git stash drop',
      keywords: []
    }
  ],
  synchronize: [
    {
      description: 'Pushes all local changesets to the remote repository',
      command: 'git push [alias] [branch]',
      keywords: []
    },
    {
      description: 'Downloads new remote history and incorporate changes',
      command: 'git pull',
      keywords: []
    },
    {
      description: 'Shows the name of remote repositories',
      command: 'git remote -v',
      keywords: []
    },
    {
      description: 'Get the latest changes from the origin but not merge',
      command: 'git fetch',
      keywords: []
    },
    {
      description: 'Removes the remote repository',
      command: 'git remote rm [remote repo name]',
      keywords: []
    }
  ],
  tagging: [
    {
      description: 'Lists all tags',
      command: 'git tag',
      keywords: ['tag', 'version', 'release']
    },
    {
      description: 'Lists tags with specified pattern',
      command: 'git tag -l "[pattern]"',
      keywords: ['tag', 'version', 'release', 'pattern']
    },
    {
      description: 'Create annotated tag',
      command: 'git tag -a [version] -m [message]',
      keywords: ['tag', 'version', 'release', 'annotate']
    },
    {
      description: 'Create a lightweight tag',
      command: 'git tag [version]',
      keywords: ['tag', 'version', 'release', 'lightweight']
    },
    {
      description: 'Tagging a commit',
      command: 'git tag -a [version] [commit]',
      keywords: ['tag', 'version', 'release', 'later']
    },
    {
      description: 'Sharing a tag',
      command: 'git push [alias] [version]',
      keywords: ['tag', 'version', 'release', 'later']
    },
    {
      description: 'Checkout tags',
      command: 'git checkout [version]',
      keywords: ['tag', 'version', 'release']
    },
    {
      description: 'Change the commit message',
      command: 'git commit --amend',
      keywords: ['undo', 'message', 'commit']
    }
  ],
  'moving & removing files': [
    {
      description: 'Deletes the file from the working directory and stages the deletion',
      command: 'git rm [file]',
      keywords: []
    },
    {
      description: 'Removes the file from version control but preserves the file locally',
      command: 'git rm --cached [file]',
      keywords: []
    },
    {
      description: 'Renames the file',
      command: 'git mv [from] [to]',
      keywords: []
    }
  ],
  'history & diff': [
    {
      description: 'Lists version history for the current branch',
      command: 'git log',
      keywords: []
    },
    {
      description: 'Lists version history for a file, including renames',
      command: 'git log --follow [file]',
      keywords: []
    },
    {
      description: 'Shows content differences between two branches',
      command: 'git diff [first-branch]...[second-branch]',
      keywords: []
    },
    {
      description: 'Shows changes of the specified commit',
      command: 'git show [commit]',
      keywords: []
    }
  ]
};

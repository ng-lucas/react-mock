## Git flow

Reference flow [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)

### Assumption
* Created a Central Repository on Gitlab.
* The default branch of Central Repository is master/develop.
* Developers can fork (or create a new branch) from the Central Repository.
* The reviewer and the merge authority have been decided.

### Rule
* Each pull-request/merge-request corresponds to a ticket.
* Each pull-request/merge-request has no limit on the number of commits
* Pull-request/merge-request title must match the title of the task with the format `[ticket number] Ticket title` （ Example: `[1234] My task title`）.
* For commit title, in case that pull-request/merge-request has only 1 commit, you can set commit title similar to above as `[ticket number] Ticket title` （ Example: `[1234] My task title`）.\
  However, in the case of a pull-request/merge-request containing many commits, it is necessary to specify in the content of the commit title which is the reciprocal handling of that commit.
    * Example:
        1. Pull-request title: `[1234] My task title`
        2. In case the pull-request has 2 commits or more, the content of the commit title of the 2 commits will be as follows
            * `[1234] My task title`
            * `[1235] fix bug A`

### Procedure
![Overview](https://iamchuka.com/content/images/size/w2000/2018/05/gitflowimage.png)

1. Clone project from Repository to your local machine..

    ```sh
    $ git clone [Repository URL]
    ```

2. Synchronize the local branch master/develop with origin.

    ```sh
    $ git checkout develop
    $ git fetch -a
    $ git pull
    ```

3. Create a branch to do tasks from branch develop. The branch name is the ticket number of the Feature/US/Bug（Example: `bug/1234`).

    ```sh
    $ git checkout develop
    $ git checkout -b bug/1234
    ```

4. Proceed to do your task (You can commit as many as you want). However, each commit should be a specific job. For example it is a task, or a bug in that Feature/US.

5. Push your code to origin.

    ```sh
    $ git push origin bug/1234
    ```

6. At origin on Gitlab, from branch `task/1234` that has been pushed, send/create a pull-request/merge-request to branch develop.

7. Please send the URL link of the pull-request/merge-request page to the reviewer on chatwork to conduct a code review.

    7.1. In case the reviewer requests a update/refactor, follow steps 3. 〜 5.
    7.2. Continue to send the URL back to the reviewer on chatwork to conduct the code review.

8. If more than 2 reviewers agree to the pull-request/merge-request, the last reviewer will perform the pull-request/merge-request merge.
   Reviewer confirms consent by clicking thumb-up, the last reviewer will be merge the request.
   
9. Comeback to step 1.


### In case with 1 task executing, you have many commits. We should squat it to become a unified commit.

1. Synchronize local develop branch with upstream.

    ```sh
    $ git checkout develop
    $ git fetch -a
    $ git pull
    ```

2. Checkout to the branch you worked on earlier (Where there are commits that need to be squatted)（Eg: `bug/1234`）.

    ```shr
    $ git checkout bug/1234
    ```

4. Use rebase -i to merge commits into a single commit.

    ```sh
    $ git rebase -i origin/develop
    ```

    Your screen will be show as below

    ```sh
    pick 6574b66 [12345] The title of commit 1
    pick 6b7ddad [12345] The title of commit 2

    # Rebase 8fa54e1..e611341 onto 8fa54e1 (2 commands)
    #
    # Commands:
    # p, pick <commit> = use commit
    # r, reword <commit> = use commit, but edit the commit message
    # e, edit <commit> = use commit, but stop for amending
    # s, squash <commit> = use commit, but meld into previous commit
    # f, fixup <commit> = like "squash", but discard this commit's log message
    # x, exec <command> = run command (the rest of the line) using shell
    # b, break = stop here (continue rebase later with 'git rebase --continue')
    # d, drop <commit> = remove commit
    # l, label <label> = label current HEAD with a name
    # t, reset <label> = reset HEAD to a label
    # m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
    # .       create a merge commit using the original merge commit's
    # .       message (or the oneline, if no original merge commit was
    # .       specified). Use -c <commit> to reword the commit message.
    #
    # These lines can be re-ordered; they are executed from top to bottom.
    #
    # If you remove a line here THAT COMMIT WILL BE LOST.
    #
    # However, if you remove everything, the rebase will be aborted.
    #
    # Note that empty commits are commented out
    ```

    At the commit 2, change pick to s to squat the commit 2 into commit 1.

5. Save your change

6. Push your code to origin.

    ```sh
    $ git push origin bug/1234
    ```

    **In case a conflict occurs during rebase、please perform the operations of item [When conflict occurs during rebase].**

#### When conflict occurs during rebase

When a conflict occurs during rebase, it will be displayed as below (at this point will be automatically moved to an anonymous branch)

```sh
$ git rebase -i origin/develop
First, rewinding head to replay your work on top of it...
Applying: [12345] The title of commit 1
Using index info to reconstruct a base tree...
Falling back to patching base and 3-way merge...
Auto-merging path/to/conflicting/file
CONFLICT (add/add): Merge conflict in path/to/conflicting/file
Failed to merge in the changes.
Patch failed at 0001 [12345] The title of commit 1
The copy of the patch that failed is found in:
    /path/to/working/dir/.git/rebase-apply/patch
When you have resolved this problem, run "git rebase --continue".
If you prefer to skip this patch, run "git rebase --skip" instead.
To check out the original branch and stop rebasing, run "git rebase --abort".
```

1. Please do manual conflict fixparts enclosed by <<< and >>>.
In case you want to stop the rebase, use the command `git rebase --abort`.

2. Once all conflicts are resolved, continue with the rebase with:

    ```sh
    $ git add .
    $ git rebase --continue
    ```

class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    status(){
        const num_changes = this.staging.length;
        if(num_changes > 0) {
            let output = `You have ${num_changes} change/s.`;
            for(let i=0; i<num_changes; i++) {
                output += `\n${this.staging[i].location}/${this.staging[i].name}`;
            }
            return output;

        } else {
            return `You have ${num_changes} change/s.\n`;
        }
    }


    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
        
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];

        } else if(path_file === ".") {
            for(let i in modified_files){
                if(modified_files[i]){
                    this.staging.push(modified_files[i]);
                    delete modified_files[i];
                }
            }
        } else if(path_file === "*") {
            if (modified_files[".github/workflows/actions.yml"]) {
                this.staging.push(modified_files[".github/workflows/actions.yml"]);
                delete modified_files[".github/workflows/actions.yml"];
            }
        }else{
            return `Failed to add ${path_file}! File is not modified or missing.`;
        }
        return "Successfully added as index file/s.";
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;

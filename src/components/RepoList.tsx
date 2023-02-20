import { RepoItem } from "./RepoItem";
import { Repo } from "./Repo"

type Listprops = {
  repos: Repo[];
};

const RepoList: React.FC<Listprops> = ({ repos }) => {
  console.log(repos)
  return (
    <div>
      {
        repos ?
          repos.map((repo) => {
            return (
              <RepoItem
                key={repo.id}
                repo={repo}
              />
            );
          }) : null
      }
    </div>
  )
}

export default RepoList
import React, { useState } from "react";
import { Repo } from "./Repo";

type ItemProps = {
  repo: Repo;
};

export const RepoItem: React.FC<ItemProps> = ({ repo }) => {
  return (
    <div key={repo.id} className="container">
      <div className="card">
        <h2>{repo.name}</h2>
        <a href={repo.html_url} target="_blank">{repo.html_url}</a>
      </div>
    </div>
  );
};
export default RepoItem
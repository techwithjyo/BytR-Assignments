const express = require('express');
const app = express();
const port = 3000;

let githubPublicData = {
  username: "Jyo97",
  fullName: "Jyotirmoy M",
  email: "testJyotirmoy@gmail.com",
  repositories: 152,
  gists: 4,
  joinedOn: "Aug 2019"
};

function getProfileUrl(username) {
  return {profileUrl: `https://github.com/${username}`};
}

function getPublicEmail(email) {
  return {publicEmail: email};
}

function getReposCount(repositories) {
  return  {repoCount: repositories};
}

function getGistsCount(gists) {
  return {gists: gists};
}

function getUserBio(fullName, joinedOn, email) {
  return {fullName: fullName, joinedOn: joinedOn, email: email };
}

function getRepoUrl(username, repoName) {
  return `https://github.com/${username}/${repoName}`;
}

app.get('/github-profile', (req, res) => {
  res.send(getProfileUrl(githubPublicData.username));
});

app.get('/github-public-email', (req, res) => {
  res.send(getPublicEmail(githubPublicData.email));
});

app.get('/github-repos-count', (req, res) => {
  console.log(githubPublicData.repositories)
  res.send(getReposCount(githubPublicData.repositories));
});

app.get('/github-gists-count', (req, res) => {
  res.send(getGistsCount(githubPublicData.gists));
});

app.get('/github-user-bio', (req, res) => {
  res.send(getUserBio(githubPublicData.fullName, githubPublicData.joinedOn, githubPublicData.email));
});

app.get('/github-repo-url', (req, res) => {
  const repoName = req.query.repoName;
  if (!repoName) {
    res.status(400).send("Missing repoName query parameter");
    return;
  }
  res.send(getRepoUrl(githubPublicData.username, repoName));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
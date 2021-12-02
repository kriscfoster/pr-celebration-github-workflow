# PR Celebration GitHub Workflow 🎉🎉🎉

[Instructions]: # (To submit to the GitHub Actions x DEV Hackathon 2021, please fill out all sections.)

![GitHub Celebration IOT Workflow](https://user-images.githubusercontent.com/17026751/144413207-cf86613a-18c9-439b-a09b-a8a4e6359042.png)

### My Workflow

Pull requests deserve to be celebrated 🎉! This workflow integrates with smart devices to celebrate when a pull request is created. This introduces some fun into the process & could help with team morale. The celebration includes the following:

1. Turn on 🟢 **smart bulb**.
2. Play celebration music 🎵 on **smart speaker**.
3. Wait 10 seconds to **enjoy the music** 🕺.
4. Send request to **Raspberry Pi** 🥧 to take a celebration photo.
    a. Raspberry Pi **takes the photo** 📸.
    b. Raspberry Pi **uploads the photo** to cloud storage.

5. **Post message** with the celebration picture to the pull request 🎉🎉🎉.

### Video Demo

{% youtube dQw4w9WgXcQ %}

### Submission Category: 

Interesting IoT

### Yaml File or Link to Code

#### Workflow Yaml

``` yaml
name: PR Celebration

on:
  pull_request:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x]
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - name: Install dependencies
      run: npm ci
    - name: Run tests
      run: npm test
    - name: Turn office light on with green
      uses: kriscfoster/tplink-action@v1.4
      with:
        email: ${{ secrets.TPLINK_EMAIL }}
        password: ${{ secrets.TPLINK_PASSWORD }}
        deviceType: "HS100"
        deviceId: ${{ secrets.TPLINK_DEVICE_ID }}
        operation: "powerOn"
    - name: Play celebration song with Spotify
      uses: fjogeleit/http-request-action@v1.8.1
      with:
        url: https://api.spotify.com/v1/me/player/play?device_id=${{ secrets.SPOTIFY_DEVICE_ID }}
        method: PUT
        contentType: application/json
        data: "{\"context_uri\":\"${{ secrets.SPOTIFY_CONTEXT_URI }}\",\"offset\":{\"position\":0},\"position_ms\":0}"
        bearerToken: ${{ secrets.SPOTIFY_PLAYER_API_TOKEN }}
    - name: Enjoy song for 10 seconds
      run: sleep 10s
      shell: bash
    - name: Take celebration picture
      id: retrieve_celebration_picture
      run: |
        echo "::set-output name=id::$(curl -H Authorization:${{ secrets.AUTHORIZATION_TOKEN }} ${{ secrets.PI_ENDPOINT }} | jq .id | tr -d '"')"
    - name: Post celebration picture
      uses: octokit/request-action@v2.1.0
      with:
        route: POST /repos/${{ github.repository_owner }}/${{ github.event.repository.name }}/issues/${{ github.event.number }}/comments
        owner: ${{ github.repository_owner }}
        repo: ${{ github.event.repository.name }}
        issue_number: ${{ github.event.number }}
        body: "Tests Passed, it's time to celebrate!:tada::tada::tada:<br />![image](https://drive.google.com/uc?export=view&id=${{ steps.retrieve_celebration_picture.outputs.id }})"
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

#### Link to Code

{% github github.com/kriscfoster/pr-celebration-github-workflow %}

#### How was this Made?

I already had some smart devices so decided to use whatever I already had for the workflow.

##### Turning on Green Light 🟢

I used a combination of a green bulb & a TP-Link smart plug for this. The TP-Link plug can be turned on/off using their API but I decided to wrap this functionality into an action that could be used by my workflow & utilized by other workflows in the future. I created this under [tplink-action](https://github.com/kriscfoster/tplink-action).

![Image from iOS (9)](https://user-images.githubusercontent.com/17026751/144415760-4bf71f7d-9823-4843-a93c-c7728d41ed10.jpg)

##### Playing Music on Smart Speaker 🎵

I used the spotify API directly for this component. Once authenticated, you can use the spotify API to play songs/playlists on a device associated with your account. I have a smart speaker that is connected to spotify so I just needed to make an API call to play celebration music on this speaker.

##### Taking & Uploading Photo with Raspberry Pi 🥧

This was probably the most complicated part of the project. I built & expose an API from my Raspberry Pi. The code for this API is [here](https://github.com/kriscfoster/pr-celebration-github-workflow/tree/main/rpi-automation). When a request is made to an endpoint on this API, it takes a photo with a camera module on the Raspberry Pi & then uploads the photo to cloud storage. The API response contains the identifier of the photo in storage so the workflow knows how to use it.

![Image from iOS (10)](https://user-images.githubusercontent.com/17026751/144416350-3a42ac00-0c35-4362-b275-b52939574abe.jpg)

##### Posting Photo as Comment on Pull Request 🎉

I use the `octokit/request-action` action to post the photo from cloud storage to the pull request.

![Screen Shot 2021-12-02 at 10 46 08](https://user-images.githubusercontent.com/17026751/144416136-95d1c2ea-56a4-428c-9155-518ed6a58111.png)

### Additional Resources / Info

[Note:] # (Be sure to link to any open source projects that are using your workflow!)

[Note]: # (Be sure to include the DEV usernames of your collaborators, if any. )

[Reminder]: # (Submissions are due on December 8th, 2021 (11:59 PM PT or 2 AM ET/6 AM UTC on December 9th).
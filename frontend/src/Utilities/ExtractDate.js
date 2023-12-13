export let extractDateTime = (postTime) => {
    if(postTime)
        return postTime.slice(0,10);
}
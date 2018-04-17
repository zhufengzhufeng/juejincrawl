let fs = require('fs');
let superagent = require('superagent');
let users = require('./users');
let promises = Object.keys(users).map(uid => superagent.get(`https://lccro-api-ms.juejin.im/v1/get_multi_user?uid=${uid}&device_id=1522912212807&token=eyJhY2Nlc3NfdG9rZW4iOiJlUkdmdE51SFg2ODdwUUt0IiwicmVmcmVzaF90b2tlbiI6IlNISnJ6c2t2RHAxUkd3QzEiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D&src=web&ids=${uid}&cols=viewedEntriesCount%7Crole%7CtotalCollectionsCount%7CallowNotification%7CsubscribedTagsCount%7CappliedEditorAt%7Cemail%7CfollowersCount%7CpostedEntriesCount%7ClatestCollectionUserNotification%7CcommentedEntriesCount%7CweeklyEmail%7CcollectedEntriesCount%7CpostedPostsCount%7Cusername%7ClatestLoginedInAt%7CtotalHotIndex%7CblogAddress%7CselfDescription%7ClatestCheckedNotificationAt%7CemailVerified%7CtotalCommentsCount%7Cinstallation%7Cblacklist%7CweiboId%7CmobilePhoneNumber%7Capply%7CfolloweesCount%7CdeviceType%7CeditorType%7CjobTitle%7Ccompany%7ClatestVoteLikeUserNotification%7CauthData%7CavatarLarge%7CmobilePhoneVerified%7CobjectId%7CcreatedAt%7CupdatedAt`).then(res => JSON.parse(res.text)));
Promise.all(promises).then(userinfos => {
    console.log(userinfos)
    userinfos.forEach(userinfo => {
        if (Object.keys(userinfo.d).length > 0) {
            let uid = Object.keys(userinfo.d)[0];
            let { totalCollectionsCount, totalViewsCount } = userinfo.d[uid];
            users[uid].totalViewsCount = totalViewsCount;
            users[uid].totalCollectionsCount = totalCollectionsCount;
        }
    });
    fs.writeFileSync('./users.json', JSON.stringify(users));
}, (err) => {
    console.log(err);
});
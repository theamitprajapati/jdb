const bfj = require("bfj");
bfj.parse
function JDB() {
  this.db = bfj;
  this.path = "./db.json";
}

JDB.prototype.updateKey = function (oldData, newData) {
  return { ...oldData, ...newData, updated: new Date() };
};

JDB.prototype.update = async function (userId, data) {
  let rows = (await this.db.read(this.path)) || [];
  if (!rows.length) return false;
  let len = rows.length;
  for (let i = 0; i < len; i++) {
    let row = rows[i];
    if (row.user_id == userId) {
      rows[i] = this.updateKey(row, data);
      await this.db.write(this.path, rows);
      return true;
    }
  }
};

JDB.prototype.insert = async function (data) {
  let rows = this.db.read(this.path) || [];
  if (!rows.length) rows = [data];
  else rows.push(data);
  return await this.db.write(this.path, rows);
};

JDB.prototype.find = async function (userId) {
  let data = (await this.db.read(this.path)) || [];
  if (!data.length) return "false";
  let filterData = data.filter((v) => v.user_id == userId);
  return filterData;
};

JDB.prototype.findOne = async function (userId) {
  let data = await this.db.read(this.path);
  if (!data.length) return "false";
  let filterData = data.filter((v) => v.user_id == userId);
  if (filterData.length) return filterData[0];
  return filterData;
};

let jdb = new JDB();
(async()=>{
await jdb.update(2, { null: "200" });
})


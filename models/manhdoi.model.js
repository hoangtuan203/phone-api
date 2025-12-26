const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ManhDoi = sequelize.define(
  "ManhDoi",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    cccd: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },

    ho_ten: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    ngay_sinh: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    gioi_tinh: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    dia_chi: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    anh_chan_dung: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
    },

    thang_1: { type: DataTypes.BOOLEAN, defaultValue: false },
    thang_2: { type: DataTypes.BOOLEAN, defaultValue: false },
    thang_3: { type: DataTypes.BOOLEAN, defaultValue: false },
    thang_4: { type: DataTypes.BOOLEAN, defaultValue: false },
    thang_5: { type: DataTypes.BOOLEAN, defaultValue: false },
    thang_6: { type: DataTypes.BOOLEAN, defaultValue: false },
    thang_7: { type: DataTypes.BOOLEAN, defaultValue: false },
    thang_8: { type: DataTypes.BOOLEAN, defaultValue: false },
    thang_9: { type: DataTypes.BOOLEAN, defaultValue: false },
    thang_10: { type: DataTypes.BOOLEAN, defaultValue: false },
    thang_11: { type: DataTypes.BOOLEAN, defaultValue: false },
    thang_12: { type: DataTypes.BOOLEAN, defaultValue: false },

    tong_thang_duoc_cong: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    nam: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },

    created_on: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    dang_duoc_chon: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    thoi_gian_giu_cho: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    ngoai: { type: DataTypes.STRING(255), allowNull: true },
    ma_cn: { type: DataTypes.STRING(50), allowNull: true },
    quan: { type: DataTypes.STRING(100), allowNull: true },
    hoan_canh: { type: DataTypes.STRING(255), allowNull: true },
    scan_method: { type: DataTypes.STRING(50), allowNull: true },
    stt: { type: DataTypes.STRING(20), allowNull: true },

    collaborators: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
    },
    lich_su_cong: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
    },
    su_kien_ung_ho: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
    },
    mtq_dang_giu_cho: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
    },

    baserow_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "manhdoi",
    timestamps: true,
  }
);

module.exports = ManhDoi;

const axios = require("axios");
const sequelize = require("../config/db");
const ManhDoi = require("../models/manhdoi.model");

const BASEROW_BASE_URL = "https://cn1ct.trangkhuyet.vn/api";
const BASEROW_TOKEN = process.env.BASEROW_TOKEN;
const TABLE_ID = "719";
const CCCD_FIELD = "CCCD";

//api
exports.getManhDoiByCccd = async (req, res) => {
  const { cccd } = req.params;
  console.log("Received CCCD:", cccd);
  const { row_id } = req.query;

  if (!cccd?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng cung cấp CCCD",
    });
  }

  const cleanedCccd = cccd.trim();

  try {
    console.log("ok");
    let manhDoiRecord = await ManhDoi.findOne({
      where: { cccd: cleanedCccd },
    });

    console.log("ManhDoi Record from Postgres:", manhDoiRecord);

    if (manhDoiRecord) {
      return res.status(200).json({
        success: true,
        message: "Dữ liệu từ Postgres (cache)",
        data: manhDoiRecord,
        source: "postgres",
      });
    }

    let baserowData;

    if (row_id && !isNaN(row_id)) {
      const singleRowUrl = `${BASEROW_BASE_URL}/database/rows/table/${TABLE_ID}/${row_id}/?user_field_names=true`;

      const singleResponse = await axios.get(singleRowUrl, {
        headers: { Authorization: `Token ${BASEROW_TOKEN}` },
        timeout: 8000,
      });

      baserowData = singleResponse.data;

      if (baserowData[CCCD_FIELD] !== cleanedCccd) {
        return res.status(400).json({
          success: false,
          message: "row_id không khớp với CCCD cung cấp",
        });
      }
    } else {
      const filterUrl = `${BASEROW_BASE_URL}/database/rows/table/${TABLE_ID}/?user_field_names=true&filter__${CCCD_FIELD}__equal=${encodeURIComponent(
        cleanedCccd
      )}`;

      const filterResponse = await axios.get(filterUrl, {
        headers: { Authorization: `Token ${BASEROW_TOKEN}` },
        timeout: 10000,
      });

      const results = filterResponse.data.results || [];

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Không tìm thấy CCCD: ${cleanedCccd}`,
        });
      }

      baserowData = results[0]; // Lấy row đầu
    }

    manhDoiRecord = await ManhDoi.create({
      cccd: baserowData.cccd || cleanedCccd,
      ho_ten: baserowData.ho_ten || "Không xác định",
      ngay_sinh: baserowData.ngay_sinh || null,
      gioi_tinh: baserowData.gioi_tinh?.value || null, // Lấy "Option" hoặc giá trị thật
      dia_chi: baserowData.dia_chi || null,
      phone: baserowData.phone || null,
      anh_chan_dung: baserowData.anh_chan_dung || [],
      thang_1: baserowData.thang_1 || false,
      thang_2: baserowData.thang_2 || false,
      thang_3: baserowData.thang_3 || false,
      thang_4: baserowData.thang_4 || false,
      thang_5: baserowData.thang_5 || false,
      thang_6: baserowData.thang_6 || false,
      thang_7: baserowData.thang_7 || false,
      thang_8: baserowData.thang_8 || false,
      thang_9: baserowData.thang_9 || false,
      thang_10: baserowData.thang_10 || false,
      thang_11: baserowData.thang_11 || false,
      thang_12: baserowData.thang_12 || false,
      tong_thang_duoc_cong: baserowData.tong_thang_duoc_cong || 0,
      nam: baserowData.nam || null,
      created_on: baserowData["Created on"]
        ? new Date(baserowData["Created on"])
        : null,
      verified: baserowData.verified || false,
      dang_duoc_chon: baserowData.dang_duoc_chon || false,
      thoi_gian_giu_cho: baserowData.thoi_gian_giu_cho
        ? new Date(baserowData.thoi_gian_giu_cho)
        : null,
      ngoai: baserowData.ngoai || null,
      ma_cn: baserowData.ma_cn || null,
      quan: baserowData.quan || null,
      hoan_canh: baserowData.hoan_canh || null,
      scan_method: baserowData.scan_method || null,
      stt: baserowData.stt || null,
      collaborators: baserowData.Collaborators || [],
      lich_su_cong: baserowData.lich_su_cong || [],
      su_kien_ung_ho: baserowData.su_kien_ung_ho || [],
      mtq_dang_giu_cho: baserowData.mtq_dang_giu_cho || [],
      baserow_id: baserowData.id,
    });
    
    return res.status(201).json({
      success: true,
      message: "Tạo mới thành công từ Baserow",
      data: manhDoiRecord,
      source: "baserow → postgres",
      baserow_row_id: baserowData.id,
    });
  } catch (error) {
    console.error("Lỗi:", error?.response?.data || error.message);

    if (error.response?.status === 404) {
      return res
        .status(404)
        .json({ success: false, message: "Row không tồn tại trong Baserow" });
    }

    if (error.response?.status === 401) {
      return res
        .status(401)
        .json({ success: false, message: "Token Baserow không hợp lệ" });
    }

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

const dbPool = require('../config/database');

const getAllReport = () => {
    const sqlQuery = `
    SELECT 
        user.name AS inspector_name,             
        generator.generator_code,
        report.report_pdf,                 
        CONCAT(generator.generator_name, ' - ', generator.power) AS generator_type, 
        report.date_time AS report_date           
            FROM report
            JOIN user ON report.fk_user_report_id = user.user_id
            JOIN generator ON report.fk_generator_report_id = generator.generator_id
            ORDER BY report.date_time DESC
    `;

    return dbPool.execute(sqlQuery);
};

const getReportDetail = (idReport) => {
    const sqlQuery = `
    SELECT 
        report.report_id,
        report.date_time,
        user.name AS name,
        user.badge_number,
        user.email,
        generator.generator_name,
        generator.generator_code,
        generator.power,
        report.fuel_generator,
        report.radiator_water,
        report.fuel_pump,
        report.upload_photo,
        report.generator_safe_to_operate,
        report.overall_condition,
        report.inspector_sign,
        report.week_maintenance_by_mem,
        report.report_pdf,
        report.fk_user_report_id,
        report.fk_generator_report_id
        FROM report
        JOIN user ON report.fk_user_report_id = user.user_id
        JOIN generator ON report.fk_generator_report_id = generator.generator_id
        WHERE report.report_id = ?
    `;
    
    return dbPool.execute(sqlQuery, [idReport]);
}

const createNewReport = async (body) => {
    const connection = await dbPool.getConnection();

    try {
        await connection.beginTransaction();

        // Insert ke report
        const [reportResult] = await connection.execute(
            `INSERT INTO report 
                (fuel_generator, radiator_water, fuel_pump, upload_photo, generator_safe_to_operate, 
                 overall_condition, inspector_sign, week_maintenance_by_mem, report_pdf, fk_user_report_id, fk_generator_report_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                body.fuel_generator ?? null,
                body.radiator_water ?? null,
                body.fuel_pump ?? null,
                body.upload_photo ?? null,
                body.generator_safe_to_operate ?? null,
                body.overall_condition ?? null,
                body.inspector_sign ?? null,
                body.week_maintenance_by_mem ?? null,
                body.report_pdf ?? null,
                body.fk_user_report_id ?? null,
                body.fk_generator_report_id ?? null
            ]
        );

        const reportId = reportResult.insertId;

        // Lock Engine
        await connection.execute(
            `INSERT INTO lock_engine (lock_engine_condition, lock_engine_description, fk_report_lock_engine_id)
             VALUES (?, ?, ?)`,
            [body.lock_engine_condition ?? null, body.lock_engine_description ?? null, reportId]
        );

        // Circuit Breaker
        await connection.execute(
            `INSERT INTO circuit_breaker (circuit_breaker_condition, circuit_breaker_description, fk_report_circuit_breaker_id)
             VALUES (?, ?, ?)`,
            [body.circuit_breaker_condition ?? null, body.circuit_breaker_description ?? null, reportId]
        );

        // Oil Generator
        await connection.execute(
            `INSERT INTO oil_generator 
                (oil_generator_level_condition, oil_generator_level_description, 
                 oil_generator_color_condition, oil_generator_color_description, fk_report_oil_generator_id)
             VALUES (?, ?, ?, ?, ?)`,
            [
                body.oil_generator_level_condition ?? null,
                body.oil_generator_level_description ?? null,
                body.oil_generator_color_condition ?? null,
                body.oil_generator_color_description ?? null,
                reportId
            ]
        );

        // Voltmeter
        await connection.execute(
            `INSERT INTO voltmeter (voltmeter_br, voltmeter_yb, voltmeter_ry, voltmeter_rn, voltmeter_yn, voltmeter_bn, voltmeter_description, fk_report_voltmeter_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                body.voltmeter_br ?? null,
                body.voltmeter_yb ?? null,
                body.voltmeter_ry ?? null,
                body.voltmeter_rn ?? null,
                body.voltmeter_yn ?? null,
                body.voltmeter_bn ?? null,
                body.voltmeter_description ?? null,
                reportId
            ]
        );

        // Duty Selector
        await connection.execute(
            `INSERT INTO duty_selector (duty_selector_br, duty_selector_yb, duty_selector_ry, duty_selector_rn, duty_selector_yn, duty_selector_bn, duty_selector_description, fk_report_duty_selector_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                body.duty_selector_br ?? null,
                body.duty_selector_yb ?? null,
                body.duty_selector_ry ?? null,
                body.duty_selector_rn ?? null,
                body.duty_selector_yn ?? null,
                body.duty_selector_bn ?? null,
                body.duty_selector_description ?? null,
                reportId
            ]
        );

        // Ammeter
        await connection.execute(
            `INSERT INTO ammeter (ammeter_br, ammeter_yb, ammeter_ry, ammeter_rn, ammeter_yn, ammeter_bn, ammeter_description, fk_report_ammeter_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                body.ammeter_br ?? null,
                body.ammeter_yb ?? null,
                body.ammeter_ry ?? null,
                body.ammeter_rn ?? null,
                body.ammeter_yn ?? null,
                body.ammeter_bn ?? null,
                body.ammeter_description ?? null,
                reportId
            ]
        );

        // Battery Charger
        await connection.execute(
            `INSERT INTO battery_charger 
                (battery_charger_condition, battery_charger_br, battery_charger_yb, battery_charger_ry, 
                 battery_charger_rn, battery_charger_yn, battery_charger_bn, battery_charger_description, fk_report_battery_charger_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                body.battery_charger_condition ?? null,
                body.battery_charger_br ?? null,
                body.battery_charger_yb ?? null,
                body.battery_charger_ry ?? null,
                body.battery_charger_rn ?? null,
                body.battery_charger_yn ?? null,
                body.battery_charger_bn ?? null,
                body.battery_charger_description ?? null,
                reportId
            ]
        );

        // ECU
        await connection.execute(
            `INSERT INTO ecu (ecu_condition, ecu_description, fk_report_ecu_id)
             VALUES (?, ?, ?)`,
            [
                body.ecu_condition ?? null,
                body.ecu_description ?? null,
                reportId
            ]
        );

        //  Battery
        await connection.execute(
            `INSERT INTO battery (battery_condition, battery_description, fk_report_battery_id)
             VALUES (?, ?, ?)`,
            [
                body.battery_condition ?? null,
                body.battery_description ?? null,
                reportId
            ]
        );

        // Commit transaksi
        await connection.commit();
        connection.release();

        return { success: true, reportId };

    } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
    }
};


module.exports = {
    getAllReport,
    getReportDetail,
    createNewReport,
};
const dbPool = require('../config/database');

const getAllReport = () => {
    const sqlQuery = `
    SELECT 
            report.report_id,
            user.name ,
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
            report.fk_user_report_id,
            report.fk_generator_report_id
        FROM report
        JOIN user ON report.fk_user_report_id = user.user_id
        JOIN generator ON report.fk_generator_report_id = generator.generator_id
    
    `;

    return dbPool.execute(sqlQuery);
};

const getReportDetail = (idReport) => {
    const sqlQuery = `
    SELECT 
        report.report_id,
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
            report.fk_user_report_id,
            report.fk_generator_report_id
        FROM report
        JOIN user ON report.fk_user_report_id = user.user_id
        JOIN generator ON report.fk_generator_report_id = generator.generator_id
        WHERE report.report_id = ?
    `;
    
    return dbPool.execute(sqlQuery, [idReport]);
}

const createNewReport = (body) => {
    const sqlQuery = `  INSERT INTO report (fuel_generator, radiator_water, fuel_pump, 
                        upload_photo, generator_safe_to_operate, overall_condition, inspector_sign,
                        week_maintenance_by_mem, fk_user_report_id, fk_generator_report_id)
                        VALUES ('${body.fuel_generator}', '${body.radiator_water}',
                        '${body.fuel_pump}', '${body.upload_photo}', '${body.generator_safe_to_operate}', 
                        '${body.overall_condition}', '${body.inspector_sign}', '${body. week_maintenance_by_mem}',
                        '${body.fk_user_report_id}', '${body.fk_generator_report_id}')`;

                        const values = [
                            body.fuel_generator ?? null,
                            body.radiator_water ?? null,
                            body.fuel_pump ?? null,
                            body.upload_photo ?? null,
                            body.generator_safe_to_operate ?? null,
                            body.overall_condition ?? null,
                            body.inspector_sign ?? null,
                            Number.isInteger(Number(body.week_maintenance_by_mem))
                                ? Number(body.week_maintenance_by_mem)
                                : null,
                            body.fk_user_report_id ?? null,
                            body.fk_generator_report_id ?? null
                        ];

    console.log('Values:', values);

    values.forEach((value, index) => { 
        if (value === undefined) { 
            throw new Error(`Undefined value found at index ${index} in request creation`); 
        } 
    }); 
        return dbPool.execute(sqlQuery, values);
};

module.exports = {
    getAllReport,
    getReportDetail,
    createNewReport,
};
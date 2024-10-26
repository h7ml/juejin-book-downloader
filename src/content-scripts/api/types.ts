/**
 * 章节类型接口
 */
export interface SectionType {
    section_id: string; // 章节ID
    title: string; // 章节标题
    booklet_id: string; // 所属小册ID
    status: number; // 章节状态
    markdown_show: string; // 章节内容（Markdown格式）
}

/**
 * 小册信息类型接口
 */
export interface BookInfoType {
    data: {
        booklet: {
            base_info: {
                title: string; // 小册标题
            };
        };
        introduction: {
            markdown_show: string; // 小册简介（Markdown格式）
        };
        sections: SectionType[]; // 小册章节列表
    };
    err_no: number; // 错误码
}

/**
 * 章节信息类型接口
 */
export interface SectionInfoType {
    data: {
        section: SectionType; // 章节详细信息
    };
    err_no: number; // 错误码
}

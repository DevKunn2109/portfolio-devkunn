import type { Locale } from "@/lib/i18n";

export type HomeContent = {
  skip: string;
  brand: string;
  nav: { work: string; services: string; about: string; contact: string };
  localeLabel: string;
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    message: string;
    detail: string;
    primaryCta: string;
    secondaryCta: string;
    cvUnavailable: string;
  };
  approach: {
    label: string;
    title: string;
    body: string;
    items: Array<{ title: string; body: string }>;
  };
  projects: {
    label: string;
    title: string;
    body: string;
    draftLabel: string;
    items: Array<{ name: string; type: string; summary: string; tags: string[]; visualLabel: string }>;
  };
  services: {
    label: string;
    title: string;
    body: string;
    items: Array<{ title: string; body: string; deliverables: string }>;
  };
  about: { label: string; title: string; body: string; principles: string[] };
  writing: { label: string; title: string; body: string; empty: string };
  contact: { label: string; title: string; body: string; cta: string; note: string };
  footer: string;
};

const content: Record<Locale, HomeContent> = {
  vi: {
    skip: "Đi đến nội dung chính",
    brand: "Tên của bạn",
    nav: { work: "Dự án", services: "Dịch vụ", about: "Giới thiệu", contact: "Liên hệ" },
    localeLabel: "English",
    hero: {
      eyebrow: "Web Developer · TypeScript · Next.js · Node.js",
      name: "Tên của bạn",
      role: "Web Developer thiên về backend",
      message: "Xây dựng website chỉn chu, từ trải nghiệm đến hệ thống phía sau.",
      detail:
        "Tôi thiết kế và phát triển các sản phẩm web rõ ràng, dễ sử dụng và có nền tảng kỹ thuật dễ bảo trì.",
      primaryCta: "Xem dự án",
      secondaryCta: "Trao đổi công việc",
      cvUnavailable: "CV đang được cập nhật",
    },
    approach: {
      label: "Năng lực & cách làm việc",
      title: "Một mạch trải nghiệm, không phải hai nửa rời rạc.",
      body:
        "Từ cấu trúc nội dung, giao diện đến API và dữ liệu, mỗi quyết định đều hướng về cùng một kết quả: sản phẩm dễ hiểu với người dùng và dễ tiếp tục với đội ngũ.",
      items: [
        { title: "Hiểu đúng trước khi xây", body: "Làm rõ mục tiêu, luồng chính và điều kiện hoàn thành trước khi chọn giải pháp." },
        { title: "Thiết kế có hệ thống", body: "Giữ giao diện nhất quán, dễ tiếp cận và phù hợp trên nhiều kích thước màn hình." },
        { title: "Backend dễ vận hành", body: "Ưu tiên mô hình dữ liệu rõ, phân quyền tối thiểu và kiến trúc vừa đủ." },
      ],
    },
    projects: {
      label: "Dự án chọn lọc",
      title: "Những bài toán đang được chuẩn bị thành case study.",
      body: "Tên dự án đã được cung cấp; phạm vi, vai trò và kết quả sẽ chỉ được công bố sau khi xác minh.",
      draftLabel: "Case study đang hoàn thiện",
      items: [
        {
          name: "CommerceFlow API",
          type: "Loại dự án cần xác nhận",
          summary: "Nội dung bối cảnh, giải pháp và kết quả đang chờ thông tin đã kiểm chứng.",
          tags: ["API", "TypeScript", "Backend"],
          visualLabel: "API workspace preview",
        },
        {
          name: "DevKunCare",
          type: "Loại dự án cần xác nhận",
          summary: "Nội dung bối cảnh, giải pháp và kết quả đang chờ thông tin đã kiểm chứng.",
          tags: ["Next.js", "Product", "Web"],
          visualLabel: "Product interface preview",
        },
      ],
    },
    services: {
      label: "Dịch vụ",
      title: "Phạm vi có thể cùng bạn làm rõ và triển khai.",
      body: "Mô tả dưới đây là định hướng ban đầu và cần được đối chiếu với năng lực, lịch làm việc thực tế trước khi công bố.",
      items: [
        { title: "Website sản phẩm", body: "Thiết kế và phát triển website tập trung vào nội dung, hiệu năng và khả năng mở rộng.", deliverables: "Gợi ý bàn giao: giao diện, mã nguồn, tài liệu vận hành" },
        { title: "Ứng dụng web", body: "Xây dựng luồng nghiệp vụ và hệ thống quản trị cho sản phẩm ở giai đoạn đầu.", deliverables: "Gợi ý bàn giao: ứng dụng, schema dữ liệu, hướng dẫn sử dụng" },
        { title: "API & tích hợp", body: "Thiết kế API, dữ liệu và kết nối dịch vụ với trọng tâm là tính rõ ràng và bảo mật.", deliverables: "Gợi ý bàn giao: endpoint, migration, tài liệu kỹ thuật" },
      ],
    },
    about: {
      label: "Giới thiệu ngắn",
      title: "Tỉ mỉ ở phần người dùng nhìn thấy. Kỷ luật ở phần hệ thống họ không thấy.",
      body: "Tiểu sử, kinh nghiệm, học vấn và các dẫn chứng năng lực đang chờ bạn cung cấp để hoàn thiện mà không tạo ra tuyên bố thiếu căn cứ.",
      principles: ["Giao tiếp rõ ràng", "Làm theo lát hoàn chỉnh", "Kiểm chứng trước khi công bố"],
    },
    writing: {
      label: "Bài viết",
      title: "Ghi chép về web, backend và cách xây sản phẩm.",
      body: "Khu vực này sẽ là nơi phát triển nội dung chuyên môn bằng tiếng Việt và tiếng Anh.",
      empty: "Chưa có bài viết được xuất bản.",
    },
    contact: {
      label: "Bắt đầu một cuộc trao đổi",
      title: "Bạn đang tuyển người hay cần một website được làm đến nơi đến chốn?",
      body: "Kênh liên hệ chính thức đang chờ cấu hình. Biểu mẫu sẽ được kết nối ở lát chức năng tiếp theo.",
      cta: "Thông tin liên hệ đang cập nhật",
      note: "Không có dữ liệu nào được gửi ở phiên bản hiện tại.",
    },
    footer: "Portfolio đang được hoàn thiện · Nội dung cá nhân là placeholder có chủ đích.",
  },
  en: {
    skip: "Skip to main content",
    brand: "Your name",
    nav: { work: "Work", services: "Services", about: "About", contact: "Contact" },
    localeLabel: "Tiếng Việt",
    hero: {
      eyebrow: "Web Developer · TypeScript · Next.js · Node.js",
      name: "Your name",
      role: "Backend-focused Web Developer",
      message: "Thoughtful websites, from the experience to the system behind it.",
      detail: "I design and build clear, usable web products on maintainable technical foundations.",
      primaryCta: "View projects",
      secondaryCta: "Discuss a project",
      cvUnavailable: "CV is being updated",
    },
    approach: {
      label: "Capabilities & approach",
      title: "One product experience, not two disconnected halves.",
      body: "From content structure and interface to APIs and data, every decision aims at the same outcome: a product users understand and teams can continue building.",
      items: [
        { title: "Understand before building", body: "Clarify goals, core journeys and completion criteria before selecting a solution." },
        { title: "Design systematically", body: "Keep the interface consistent, accessible and effective across screen sizes." },
        { title: "Operable backend", body: "Prefer clear data models, least-privilege access and architecture that is only as complex as needed." },
      ],
    },
    projects: {
      label: "Selected work",
      title: "Projects being shaped into verified case studies.",
      body: "The project names were provided; scope, role and outcomes will only be published after verification.",
      draftLabel: "Case study in progress",
      items: [
        { name: "CommerceFlow API", type: "Project type to be confirmed", summary: "Context, solution and outcome details are awaiting verified input.", tags: ["API", "TypeScript", "Backend"], visualLabel: "API workspace preview" },
        { name: "DevKunCare", type: "Project type to be confirmed", summary: "Context, solution and outcome details are awaiting verified input.", tags: ["Next.js", "Product", "Web"], visualLabel: "Product interface preview" },
      ],
    },
    services: {
      label: "Services",
      title: "Areas we can clarify and build together.",
      body: "These are initial directions and should be checked against real capabilities and availability before publication.",
      items: [
        { title: "Product websites", body: "Design and development focused on content, performance and room to grow.", deliverables: "Possible deliverables: interface, source code, operations guide" },
        { title: "Web applications", body: "Core workflows and administration for early-stage products.", deliverables: "Possible deliverables: app, data schema, usage guide" },
        { title: "APIs & integrations", body: "API, data and service integration design with clarity and security in focus.", deliverables: "Possible deliverables: endpoints, migrations, technical docs" },
      ],
    },
    about: {
      label: "About",
      title: "Careful with what users see. Disciplined with the system they do not.",
      body: "Biography, experience, education and proof of skills are waiting for your input so the site can be completed without unsupported claims.",
      principles: ["Clear communication", "Complete vertical slices", "Verify before publishing"],
    },
    writing: {
      label: "Writing",
      title: "Notes on the web, backend and building products.",
      body: "This area will grow into technical content in Vietnamese and English.",
      empty: "No articles have been published yet.",
    },
    contact: {
      label: "Start a conversation",
      title: "Hiring a developer or looking for a website built with care?",
      body: "The official contact channel is waiting to be configured. The form will be connected in the next vertical slice.",
      cta: "Contact details coming soon",
      note: "No data is submitted in this version.",
    },
    footer: "Portfolio in progress · Personal details are intentional placeholders.",
  },
};

export function getHomeContent(locale: Locale): HomeContent {
  return content[locale];
}

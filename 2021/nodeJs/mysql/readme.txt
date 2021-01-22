// 데이터베이스 생성
CREATE SCHEMA `nodejs` DEFAULT CHARACTER SET utf8;

// 테이블 생성
// users table // users comment 는 자기소개 필드입니다
CREATE TABLE nodejs.users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    age INT UNSIGNED NOT NULL,
    married TINYINT NOT NULL,
    comment TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY(id),
    UNIQUE INDEX name_UNIQUE (name ASC)
)
COMMENT = '사용자 정보'
DEFAULT CHARACTER SET = utf8;

// comment table // utf8mb4 는 이모티콘 까지 저장 가능 형식
CREATE TABLE nodejs.comments (
    id INT NOT NULL AUTO_INCREMENT,
    commenter INT NOT NULL,
    comment VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY(id),
    INDEX commenter_idx (commenter ASC),
    CONSTRAINT commenter
    FOREIGN KEY (commenter)
    REFERENCES nodejs.users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
COMMENT = '댓글'
DEFAULT CHARSET=utf8mb4
ENGINE=InnoDB;
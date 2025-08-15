export interface ProfileResponse {
    id: number;
    email: string;
    role: string;
    status: number;
    userName?: MemberProfile;
    manager?: ManagerProfile;
}

export interface MemberProfile {
    id: number;
    name: string;
    fatherName: string;
    motherName: string;
    fatherNumber: string;
    motherNumber: string;
    brithCertifecate: string;
    number: string;
    session: string;
    nid: string;
    address: string;
    email: string;
    joiningDate: Date;
    profile: string;
    code: string;
    status: number;
    instituteName?: InstituteInfo;
    department?: DepartmentInfo;
    semister?: SemisterInfo;
    bloodGroup?: BloodGroupInfo;
}

export interface ManagerProfile {
    id: number;
    name: string;
    number: string;
    position: string;
    email: string;
    startDate: Date;
    endDate: Date;
    profile: string;
    status: number;
    instituteName?: InstituteInfo;
    department?: DepartmentInfo;
    semister?: SemisterInfo;
}

export interface InstituteInfo {
    id: number;
    name: string;
}

export interface DepartmentInfo {
    id: number;
    name: string;
}

export interface SemisterInfo {
    id: number;
    name: string;
}

export interface BloodGroupInfo {
    id: number;
    name: string;
}

export interface ProfileStats {
    totalLogins: number;
    lastLogin: Date;
    accountCreated: Date;
    status: string;
}

export interface ProfileUpdateResponse {
    message: string;
    profile: ProfileResponse;
}

export interface PasswordChangeResponse {
    message: string;
}

export interface ProfilePictureResponse {
    message: string;
    profile: string;
}

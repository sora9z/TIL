[⬅️ BACK ](./README.md)

## IAM Introduction

- IAM : Identity and Access Management, Global service
- root account는 최대한 사용하지 않는 것이 좋다.
- 한 명의 USer는 한 명의 사용자이다
- Group으로 묶을 수 있다
  - user만 포함할 수 있다
  - ex) Admins, Developers, HR
  - 한 명의 User는 여러 그룹에 속할 수 있다
    - EX) user1은 Admins, Developers에 속할 수 있다
  - group으로 묶는 이유는 그룹마다 권한을 다르게 줄 수 있기 때문이다
- AWS에서는 Least Privilege Principle을 따라야 한다
  - 최소한의 권한만 주는 것이 좋다

## IAM Policies

- inline policies
  - user에게 직접 붙어있는 정책

### IAM Policies Structure

- Version
- id
- Statement

  - Sid
  - Effect
    - Allow
    - Deny
  - Principal
  - Action
  - Resource
  - Condition

- 시험볼 때에는 Effect, Principal, Action,Resource 등을 이해해야한다.

### IAM - MFA

- 사용자를 보호하기 위함
- 두 가지가 있다

1. password Policy

   - aws에서는 password policy를 설정할 수 있다
   - password 최소 길이
   - 특정 character 포함
   - iam user에게 자신만의 비밀번호를 설정하게 할 수 있다
   - password expired time을 설정할 수 있다 90일마다 변경 해야한다
   - 암호 재사용도 막을 수 있다.
   - 이는 무차별 공격을 막는데 도움이 된다.
   - 암호 정책 정의는 IAM - Aceess Management - Account setting -Password Policy에서 할 수 있다.
   - edit을 누르면 default, custom 암호 정책이 가능하다

     - default
       ![password-policy-dafault](./imgs/password-policy-default.png)

     - custom
       ![password-policy-custom](./imgs/password-policy-custom.png)

2.`MFA (Multi Factor Authentication) -- 시험에서 중요`

- password + security device you own
- password와 장치가 있어야 로그인이 가능하다
- password가 도난당하거나 해킹되어도 계정이 손상되지 않는다.

- `MFA device options in AWS`
  - https://aws.amazon.com/iam/features/mfa/?audit=2019q1
  - Virtual MFA device
    - Google Authenticator(phone only)
    - Auth(phone only)
    - 한 개의 장치에 여러 개의 토큰을 지원한다.
    - 가상 MFA장치에 사용자 및 계정을 원하는 만큼 추가할 수 있다.
  - Universal 2nd Factor (U2F) Security Key
    - YubiKey by Yubico (not aws 3rd party)
    - 단일 보안키를 이용해 여러 개의 root와 iam usre를 지원한다(사용자만큼 많은 키를 필요로 하지 않는다.)
  - Hardware Key Fob MFA Device
    - Gemalto (not aws 3rd party)
  - Hardware Key Fob MFA Device AWS GovCloud (US)
    - SurePassID (not aws 3rd party)
  - 보안 자격 증명 들거가기
    - root의 security credential은 우측 상단의 사용자 이름을 클릭하고 내 보안 자격 증명을 관리(security credential)를 클릭한다.
      ![mfa-security-credential-1](./imgs/mfa-security-credential-1.png)
      - iam user의 경우
        - iam - Access management - Usres - username클릭 - security credential 에서도 확인이 가능하다
    - 3 가지의 방법이 있다
      ![mfa-security-credential-2](./imgs/mfa-security-credential-2.png)
    - Authenticaor app을 선택하고 다음을 클릭한다.
      ![mfa-security-credential-3](./imgs/mfa-security-credential-3.png)
    - mfa qr code를 app으로 스캔하고 두 개의 코드를 입력한다.
      ![mfa-security-credential-4](./imgs/mfa-security-credential-4.png)
    - mfa가 활성화 되었다.
      ![mfa-security-credential-5](./imgs/mfa-security-credential-5.png)
    - 다시 로그인을 하면 id,pw 와 더불어 mfa 코드를 입력해야한다.

### IAM - Access Key, CLI, SDK

- AWS에 access 하는 방법은 세 가지가 있다
  - AWS Management Console - protected by password and MFA
  - AWS CLI - protected by access key
  - AWS Software Developer Kit (SDK) - for code: protected by access key
- Access Key는 AWS console을 통해 생성한다
- 사용자는 자신의 Access key를 관리해야하며, 노출되지 않도록 주의해야한다.
- Access Key ID = username과 비슷한 개념이며 Secrete Access Key는 password와 비슷한 개념이다.

- Access Key 생성 방법

  - iam - Access management - Users - username - Security credential - Create access key
    ![access-key-1](./imgs/access-key-1.png)
  - 어디서 사용할 것인지 선택
    ![access-key-2](./imgs/access-key-2.png)
  - Access key ID와 Secrete access key를 다운로드 받는다. 이때밖에 못하니 저장해두자
    ![access-key-3](./imgs/access-key-3.png)

- aws cli access key configuration
  - cli에 아래와 같이 입력한다.
  ```bash
  aws configure
  ```
- 그럼 아래와 같이 입력하라고 나온다.
  ```bash
  AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
  AWS Secret Access Key [None]:
  Default region name [None]: ap-northeast-2
  ```
  - enter를 치고 잘 작동하는지 확인
  ```bash
  aws iam list-users
  ```

### AWS CloudShell

- 브라우저 기반의 aws shell이다.
- https://docs.aws.amazon.com/ko_kr/cloudshell/latest/userguide/welcome.html
- https://aws.amazon.com/cli/
- aws 사이트에서 우측 상단의 서비스에서 cloudshell을 클릭하면 된다.
  - 전체 화면을 누르면 별도의 채 상이 나온다. 지역도 선택 가능하다.
    ![cloudshell-1](./imgs/cloudshell-1.png)
- 아래와 같이 cloudshell이 나온다.
  ![cloudshell-2](./imgs/cloudshell-2.png)
  - 모든 region에서 사용할 수 있는 것은 아니다. 사용 가능한 리전은 아래에서 확인 가능하다
    - https://docs.aws.amazon.com/ko_kr/cloudshell/latest/userguide/supported-aws-regions.html
- 설정을 아래와 같이 가능하다
  ![cloudshell-3](./imgs/cloudshell-3.png)

### IAM - Roles

- aws 서비스는 우리를 대신해 행동을 해야한다.
- 그러기 위해서는 IAM Role을 사용해서 AWS service에 permission을 줘야한다.
- 예를 들면 EC2 instance가 aws로 어떤 작덥을 수행하려고 할 때 EC2에 permission을 줘야하는데 그러려면 IAM Role을 생성해야 한다.
  - EC2 인스턴스가 AWS의 어떤 정보에 접근하려고 할 때 IAM Role에 할당된 권한이 있어야 한다.
- Common Role
  - EC2 Instance Role
  - Lambda Function Role
  - Roles for CloudFormation
- Role 생성 방법
  - iam - Access management - Roles - Create role
    ![role-1](./imgs/role-1.png)
    - Role은 AWS Entity에 aws에 작업을 할 수 있는 권한을 주는 방법이다.
  - 다양한 역할이 있다. 여기서는 AWS service를 선택한다. AWS service를 위한 역할이다.
    ![role-2](./imgs/role-2.png)
    - Use Case는 어떤 서비스에 이 Role이 적용되길 원하는지 선택한다.
      ![role-3](./imgs/role-3.png)
  - 정책을 설정한다.
    ![role-4](./imgs/role-4.png)
  - Role name 및 description을 설정한다.
    ![role-5](./imgs/role-5.png)
    - selected trusted eitities를 확인해보자
      ```bash
          {
              "Version": "2012-10-17", # 정책 문서의 버전
              "Statement": [ # 정책의 주요 구성 요소
                  {
                      "Effect": "Allow",
                      "Action": [ # 정책이 허용하는 특정 AWS API 작업정의
                          "sts:AssumeRole" # 지정된 entity가 해당 역할을 가질 수 있도록 허용하는 동작. 즉, EC2 인스턴스가 이 역할을 수행할 수 있도록 허용
                      ],
                      "Principal": { # 역할을 사용할 수 있는 AWS 서비스나 사용자 또는 계정을 정의
                          "Service": [
                              "ec2.amazonaws.com" # EC2가 이 역할을 수행할 수 있음
                          ]
                      }
                  }
              ]
          }
      ```

### IAM Secutiry Tools

- IAM Credentials Report (account-level)
  - 모든 사용자와 계정 자격증명의 상태를 보여준다.
  - IAM - Access reports - Credential report
    - 다운로드 받으면 아래와 같은 정보를 볼 수 있다
      ```bash
        user	arn	user_creation_time	password_enabled	password_last_used	password_last_changed	password_next_rotation	mfa_active	access_key_1_active	access_key_1_last_rotated	access_key_1_last_used_date	access_key_1_last_used_region	access_key_1_last_used_service	access_key_2_active	access_key_2_last_rotated	access_key_2_last_used_date	access_key_2_last_used_region	access_key_2_last_used_service	cert_1_active	cert_1_last_rotated	cert_2_active	cert_2_last_rotated
      ```
    - 이를 통해 비밀번호를 바꾸지 않는 사용자 등을 확인 가능하다.
- IAM Access Advisor (user-level)
  - 사용자의 service permission을 보여준다.
  - 사용자가 어떤 서비스에 언제 액세스했는지 보여준다.
  - 이를 통해 어떤 권한이 사용되었는지 사용되지 않았는지를 볼 수 있다.
    - 최소 권한 원칙을 준수할 수 있다.
  - IAM - Access management - Users - username - AccessAdviser
  - 사용자가 언제 어떤 서비스에 접속했는지 볼 수 있다.
    ![access-advisor](./imgs/access-advisor.png)
    - 사용자가 올바른 권한을 갖고있는지 알 수 있다.
    - 세분화된 사용자 엑세스 권한을 확인할 때 매우 유용하다.

### IAM Guidelines & Best Practices

- Root account는 account setup 말고는 사용하지 않는다.
- 물리적인 user 는 하나의 AWS user이다.
- 유저는 그룹에 속하게 하고 그룹에 권한을 부여한다.그룹레벨에서 관리가 가능하다
- MFA 사용을 최대한 강제하라
- AWS서비스를 생성할 때마다 권한이 부여된 Rule을 만들어라
- programmatic access를 위해 access key를 사용한다
- IAM credential report & IAM Access Advisor를 사용하여 permission을 수정할 수 있다.
- 절대 IAM user 와 Access key를 공유하지 않는다.

### Shared responsibility Model for IAM

- `시험 내내 공유 책임 모델에 대한 질문을 많이 받을 것임`
- 어떤 것에 책임이 있는지 확실히 하기 위함
- Shared Responsibility Model Hot it works
  - AWS는 아래와 같은 책임을 갖는다
    - Infrastructure(global network security)
    - Configuration and vulnerability analysis
    - Compliance validation
    - 즉, AWS는 `모든 인프라를 책임`진다.
  - YOU, ME ,사용자
    - Users, Gropus, Roles, Policies, management and monitoring
    - Enable MFA on all accounts
    - Rotate all keys regularly
    - Use IAM tools to appli appropriate permissions
    - Analyze access patterns and review permissions
    - 즉, AWS에서 제공한 인프라를` 어떻게 사용할지` 책임진다

## Summary

- USers : 한 명의 사용자와 매칭되고 AWS Console에서 사용할 password를 갖는다.
- Groups: 사용자만 속할 수 있으며 그룹에 권한을 부여할 수 있다.
- Policies : JSON문서로 구성되어있으며 사용자, 그룹에 권한에 대한 Outlines를 제공한다.
- Roles : AWS 서비스가 다른 AWS 서비스에 접근할 수 있도록 권한을 부여한다.
- Security : MAF + password Policy
- AWS CLI : cli를 사용해서 aws service에 접근할 수 있다.
- AWS SDK : code를 사용해서 aws service에 접근할 수 있다.
- Acess Keys : AWS CLI, SDK를 사용할 때 사용한다.
- Autdit : IAM credential report, IAM access advisor를 사용해서 사용자의 권한을 관리할 수 있다.

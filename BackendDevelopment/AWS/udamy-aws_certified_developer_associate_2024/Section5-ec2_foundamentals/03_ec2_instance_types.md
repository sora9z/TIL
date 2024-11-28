[⬅️ BACK ](./README.md)

# EC2 Instance Types

- EC2 Instance의 type을 알아본다.
- 어떤 타입이 있고 언제 무엇을 사용하면 좋을지 고민해보자

- 각 인스턴스 이름이 무엇을 의미하는지 알아보자.

  - m5.2xlarge
    - m : instance class를 의미함
    - 5 : generation(5세대) 6이 나오면 m6이 됨
    - 2xlarge : instance 클래스의 사이즈. 많을수록 많은 메모리, 많은 cpu를 갖는다

## 사용 목적에 따른 EC2 Instance Type

- 아래의 링크에서 사용 목적에 따른 EC2 Instance Types를 확인할 수 있다.

  - https://aws.amazon.com/ko/ec2/instance-types/

### General Purpose(범용)

- 웹 서버나 코드 저장소와 같은 다양한 작업에 적합함
- Compute, Memory, Networking 의 벨런스가 좋다
- T2 인스턴스
  - 기본 수준의 성능을 제공하는 인스턴스
  - 비용 효율적인 선택
  - 대부분의 웹서버 또는 개발/테스트 환경에 적합

### Compute Optimized

- Compute-intensive task가 많다면 적합하다
- Use cases:

  - Batch processing workloads
  - Media transcoding
  - High performance web servers
  - High performance computing (HPC)
  - Scientific modeling & machine learning
  - Dedicated gaming servers

- Instance 이름이 C로 시작한다
- C5, C5a, C5n, C5d, C5n, C5d

### Memory Optimized

- 대량의 데이터를 메모리에 담고있어야 하는 빠른 성능을 필요로 할 때
- Use cases:

  - High performance relational/non-relational databases
  - Distributed web scale cache stores
  - In-memory databases optimized for BI(Business Intelligence)
  - Applications for real-time processing of big unstructured data

- 인스턴스 이름이 R, X, Z로 시작한다.
- R5, R5a, R5n, R5d

### Storage Optimized

- 저장소 최적화된 인스턴스
- storage-intensive task가 많다면 적합하다
- 로컬 저장소에 있는 많은 데이터셋에 접근할 때 유용하다
- 대용량 데이터를 높은 순차 읽기 및 쓰기가 필요한 경우

- Use cases:

  - High frequency online transaction processing (OLTP) systems
  - Relational & NoSQL databases
  - Cache for in-memory databases (for example, Redis)
  - Data warehousing applications
  - Distributed file systems

- 인스턴스 이름이 I로 시작한다. 또는 G,H1
- I3, I3en, I3e

### Example

- 아래의 링크에서 인스턴스 비교를 확인 가능

  - https://instances.vantage.sh/

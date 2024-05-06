- feature engineering이란 원본 데이터로부터 도메인 지식 등을 바탕으로 문제를 해결하는데 도움이 되는 Feature를 생성, 변환하고 이를 머신러닝 모델에 적합한 형식으로 변환하는 작업
- 머신러닝 모델의 성능을 올리는데 가장 중요한 핵심적인 작업이다.
- 거의 80~90% 는 feature enginnering에 달려있다

## 1. Pandas Group By Aggregation을 이용한 Feature Engineering

- 사용하는 데이터 :
  - 원본 데이터에서 주어진 Fature에 고객 ID기반으로 Pandas Group By Aggregation을 이용하여 함수를 적용해서 새로운 Feature를 생성
  - quantity, price, total 을 아래의 함수로 계산한 것을 lable별로 확인
- 사용하는 함수 : sum, mean, max, min, std, skew

- 구매액 합의 분포를 lable별로 그림
  ![feature_engineering_1](/imgs/feature_engineering_1.png)
  - lable = 1 인 겻은 300이 넘음
  - lable이 1일때가 0일 떄보다 전반적으로 값이 크다
  - lable별 분포가 확연하게 다르기 때문에 모델에서 사용할 수 있는 좋은 피쳐라고 할 수 있다.
  - 머신러닝 모델은 데이터에서 타켓을 구분할 수 있는 패턴을 인식하는 것이고 어떤 피처가 타겟 레이블별로 분포가 다르면 모델에서 이 패턴을 쉽게 인식할 수 있기 때문에 좋은 피처라고 할 수 있다.
- quantity-sum Feature
  ![feature_engineering_2](/imgs/feature_engineering_2.png)
  - 과거 고객이 구매한 상품 개수의 합
  - 상품 개수의 합이 클수록 lable값이 1인 확률이 높다
  - lable별 분포가 확연히 다르기 때문에 좋은 피처라고 할 수 있다.
- price-sum feature
  ![feature_engineering_3](/imgs/feature_engineering_3.png)
  - 과거 고객이 주문한 상품 가격의 합
  - 비싼 상품을 구매할 수록 lable값이 1인 확률이 높다
  - lable이 1일 떄가 0일 떄보다 가격이 높다
  - lable별 분포가 확연히 다르기 때문에 좋은 피처라고 할 수 있다.
- total-count Feature
  ![feature_engineering_4](/imgs/feature_engineering_4.png)
  - 이것도 lable이 1일 떄가 0일 때보다 전반적으로 값이 크다
  - lable별 분포가 확연히 다르기 때문에 좋은 피처라고 할 수 있다.
- 다른 피쳐들도 확인을 해볼 수 있는데 quantity, price, total의 count가 같다. row수를 세기 때문임 count feature는 사실상 중복 피처임
- total-mean Feature
  ![feature_engineering_5](/imgs/feature_engineering_5.png)
  - 과거 고객이 구매한 구매액의 평균
  - 평균이 높을수록 lable이 1일 확률이 높다고 할 수 있다고 생각할 수 있는데 실제 그래프를 보면 기대했던 것 처럼 차이가 크지 않은 것을 볼 수 있다.
- quantity-mean Feature
  ![feature_engineering_6](/imgs/feature_engineering_6.png)
  - 과거 고객이 구매한 상품 개수의 평균
  - 평균이 높을수록 lable이 1일 확률이 높다고 할 수 있는데 실제 그래프를 보면 기대했던 것 처럼 차이가 크지 않은 것을 볼 수 있다. 조금 큰 것을 볼 수 있다.
- price-mean Feature
  ![feature_engineering_7](/imgs/feature_engineering_7.png)
  - 과거 고객이 구매한 상품 가격의 평균
  - 이것도 큰 차이는 없다.
- total-min Feature
  ![feature_engineering_8](/imgs/feature_engineering_8.png)
  - 과거 고객이 구매한 구매액의 최소값 분포
  - lable이 1인 구매액의 최솟값이 0인 구매액의 최솟값보다 작은 것을 볼 수 있음
  - "-" 인 것을 환불건
- quantity-min Feature
  ![feature_engineering_9](/imgs/feature_engineering_9.png)
  - 과거 고객이 구매한 상품 개수의 최소값 분포
  - 분포 자체에 큰 차이는 없어보인다.
- price-min Feature
  ![feature_engineering_10](/imgs/feature_engineering_10.png)
  - 과거 고객이 구매한 상품 가격의 최소값 분포
  - lable1인 값이 0인 값보다 작은 값에 분포되어있음을 볼 수 있다.
- total-std Feature
  ![feature_engineering_11](/imgs/feature_engineering_11.png)
  - 과거 고객이 구매한 구매액의 표준편차 분포
  - 표준편차 값이 작으면 구매액이 비슷하다고 볼 수 있음. 크면 구매액간의 차이가 크다고 볼 수 있다
  - 표준편차가 큰게 lable1일 확률이 족므 높아보이긴한다.
- total-skew Feature
  ![feature_engineering_12](/imgs/feature_engineering_12.png)
  - 과거 고객이 구매한 구매액값이 어느 쪽으로 쏠려있는지를 의미한다.
  - 왜도가 음수이면 왼쪽으로 치우쳐져있음을 의미하고 양수이면 오른쪽으로 치우쳐져있음을 의미한다.
  - 왜도가 크면 lable1일 확률이 높아보인다.

## 2. Cross Validation을 이용한 Out of Fold 예측 -> 모델 성능 높이는 방법

- 모델 Training 시 Cross Validation을 적용해서 Out of Fold Validaton 성능 측정 및 Test 데이터 예측을 통해 성능 향상
- Cross Validation을 데이터를 여러 개의 fold로 나눠서 validation 성능을 측정하는 방법
  ![feature_engineering_13](/imgs/feature_engineering_13.png)
- Out of Fold 예측은 Fold마다 trainig한 모델로 테스트 데이터를 예측하고 Fold 개수 만큼의 test 결과가 나오는데 일르 average 앙상블에서 최종 테스트 예측값으로 사용하는 방식을 말한다.

## 3. LightGBM Early Stopping 적용

- LightGBM에서 제공하는 Early Stopping을 적용해서 성능 향상
- Early Stopping이란
  - Iteration을 통해 반복학습이 가능한 머신러닝 모델에서 validation 성능 측정을 통해  
    validation 성능이 가장 좋은 하이퍼파라미터에서 학습을 조기 종료하는 Regularization 방법
    ex) Boosting 트리 모델 트리 개수, 딥러닝의 Epoch 수를 설정할 떄 사용할 수 있다.
- LightGBM Early Stoppint
  - LightGBM에서 몇 개의 트리를 만들지 n_estimators란 하이퍼파라미터로 설정하고 이 개수만큼 트리를 만들지만, 설정한 트리 개수가 최적의 값이라고 볼 수 없음
  - Early Stoppingd은 validation 데이터가 있을 시, LightGBM 트리 개수인 n_estimators는 충분히 크게 설정하고, early_stopping_rounds를 적절한 값으로 설정
  - 트리를 추가할 때마다 validation 성능을 측정하고 이 성능이 early_stopping_rounds 값 이상 연속으로 성능이 좋아지지 않으면 더 이상 트리를 만들지 않고 가장 validation 성능이 좋은 트리 개수를 최종 트리개수로 사용

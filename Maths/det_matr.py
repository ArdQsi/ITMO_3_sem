test1 = [[3,4,-5],
     [-2, 1, 6],
     [3, 0, 2]]

test2 = [[1,-2,3],
     [4, 0, 6],
     [-7, 8, 9]]

test3 = [[3,-3,-5,8],
     [-3, 2,4,-6],
     [2, -5, -7,5],
     [-4,3,5,-6]]

def f(a):
    if len(a)>2:
        res = 0
        for i in range(len(a)):
            new_arr = []
            for j in range(len(a)):
                if (i!=j):
                    new_arr.append([a[k][j] for k in range(1,len(a))])
            res += f(new_arr) * a[0][i] * (-1 + 2 * ((i + 1) % 2))
        return res
    else:
        return a[0][0] * a[1][1] - a[1][0] * a[0][1]

print(f(test1))
print(f(test2))
print(f(test3))

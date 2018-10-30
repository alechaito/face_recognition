angular
    .module('app', ['ngRoute'])
    .controller('LogsController', ['$http', '$sce', LogsController])
    .controller('CadastroController', ['$http', CadastroController])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/logs', {
                templateUrl: 'views/logs.html',
                controller: 'LogsController'
            })
            .when('/cadastro', {
                templateUrl: 'views/cadastro.html',
                controller: 'CadastroController'
            })
            .otherwise({
                redirectTo: '/logs'
            });
    }])

function LogsController($http, $sce) {
    let vm = this;

    // Test Logs
    vm.logs = [{
            nome: "Luan Lorenzo",
            matricula: "15104328",
            data: "12/04/2018",
            hora: "18:30"
        },
        {
            nome: "Ale Chaito",
            matricula: "1524328",
            data: "12/04/2018",
            hora: "18:30"
        },
        {
            nome: "Luan Rodrigues",
            matricula: "15234328",
            data: "12/04/2018",
            hora: "18:30"
        },
        {
            nome: "Gabs",
            matricula: "14202480",
            data: "12/04/2018",
            hora: "18:30"
        },
        {
            nome: "Xico",
            matricula: "14202492",
            data: "12/04/2018",
            hora: "18:30"
        },
        {
            nome: "Guina",
            matricula: "13104328",
            data: "12/04/2018",
            hora: "18:30"
        },
        {
            nome: "Ale Chaito",
            matricula: "1524328",
            data: "22/09/2018",
            hora: "15:30"
        },
        {
            nome: "Luan Rodrigues",
            matricula: "15234328",
            data: "23/09/2018",
            hora: "19:30"
        },
        {
            nome: "Luan Lorenzo",
            matricula: "15104328",
            data: "23/09/2018",
            hora: "18:30"
        },
        {
            nome: "Guina",
            matricula: "13104328",
            data: "24/09/2018",
            hora: "15:00"
        },
        {
            nome: "Ale Chaito",
            matricula: "1524328",
            data: "26/09/2018",
            hora: "12:30"
        }
    ]

    $http({
            method: 'GET',
            url: $sce.trustAsResourceUrl('http://localhost:4500/api/getlogs')
        })
        .then(function successCallback(res) {
            vm.logs = res.data;
            console.log(res);
        }, function errorCallback(err) {
            console.log(err);
        });
}

function CadastroController($http) {
    let vm = this;
    vm.userData = new Object();
    
    vm.submit = function() {
        if(vm.nome && vm.matricula && vm.email && vm.password && vm.image) {
            vm.userData = {
                userNome: vm.nome,
                userMatricula: vm.matricula,
                userEmail: vm.email,
                userPassword: vm.password,
                userImage: vm.image
            }
               
            $http({
                method: 'POST',
                url: 'http://alechaito.com',
                headers: {
                  'Content-Type': undefined
                },
                data: userData
            })
            .then(function (res) {
                console.log(res);
            }, function (err) {
                console.log(err);
            });

        } else {
            alert("Falha no registro. Está faltando dados");
        }
    }
}